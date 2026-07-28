"""Detailed DOM audit: contrast, empty sections, broken links, touch targets, a11y."""
from playwright.sync_api import sync_playwright
import json

ROUTES = ["/", "/services", "/services/web", "/services/mobile", "/services/business", "/about", "/contact"]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    for route in ROUTES:
        url = f"http://localhost:3000{route}"
        page.goto(url, wait_until="networkidle", timeout=15000)
        page.wait_for_timeout(1500)

        print(f"\n{'='*60}")
        print(f"  PAGE: {route}")
        print(f"{'='*60}")

        # 1. Check for empty/invisible sections
        sections = page.evaluate("""() => {
            const sects = document.querySelectorAll('section, [class*="Section"], main > div');
            return Array.from(sects).map(s => ({
                tag: s.tagName,
                id: s.id || '',
                classes: s.className?.substring?.(0, 80) || '',
                height: s.getBoundingClientRect().height,
                text: s.textContent?.trim()?.substring(0, 50) || '(empty)',
                childCount: s.children.length
            }));
        }""")
        empty = [s for s in sections if s['height'] < 10 or s['text'] == '(empty)']
        if empty:
            print(f"\n  EMPTY/COLLAPSED SECTIONS ({len(empty)}):")
            for s in empty:
                print(f"    - <{s['tag']}> id={s['id']} h={s['height']}px children={s['childCount']}")

        # 2. Check images without alt text
        imgs = page.evaluate("""() => {
            return Array.from(document.querySelectorAll('img')).map(img => ({
                src: img.src?.substring(0, 60),
                alt: img.alt,
                width: img.naturalWidth,
                height: img.naturalHeight
            }));
        }""")
        no_alt = [i for i in imgs if not i['alt']]
        if no_alt:
            print(f"\n  IMAGES WITHOUT ALT ({len(no_alt)}):")
            for i in no_alt:
                print(f"    - {i['src']}")

        # 3. Check buttons/links without accessible names
        a11y = page.evaluate("""() => {
            const issues = [];
            document.querySelectorAll('button, a, [role="button"]').forEach(el => {
                const text = el.textContent?.trim();
                const aria = el.getAttribute('aria-label');
                const title = el.title;
                if (!text && !aria && !title) {
                    issues.push({ tag: el.tagName, classes: el.className?.substring?.(0, 60) });
                }
            });
            return issues;
        }""")
        if a11y:
            print(f"\n  ELEMENTS WITHOUT ACCESSIBLE NAME ({len(a11y)}):")
            for el in a11y:
                print(f"    - <{el['tag']}> .{el['classes']}")

        # 4. Check touch target sizes (< 44px)
        small_targets = page.evaluate("""() => {
            const issues = [];
            document.querySelectorAll('button, a, input, select, textarea').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
                    issues.push({
                        tag: el.tagName,
                        text: el.textContent?.trim()?.substring(0, 30),
                        w: Math.round(rect.width),
                        h: Math.round(rect.height)
                    });
                }
            });
            return issues;
        }""")
        if small_targets:
            print(f"\n  SMALL TOUCH TARGETS < 44px ({len(small_targets)}):")
            for t in small_targets[:8]:
                print(f"    - <{t['tag']}> \"{t['text']}\" {t['w']}x{t['h']}px")

        # 5. Check heading hierarchy
        headings = page.evaluate("""() => {
            return Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(h => ({
                level: parseInt(h.tagName[1]),
                text: h.textContent?.trim()?.substring(0, 50)
            }));
        }""")
        print(f"\n  HEADING HIERARCHY:")
        for h in headings:
            print(f"    {'  ' * (h['level']-1)}H{h['level']}: {h['text']}")
        # Check for skipped levels
        for i in range(1, len(headings)):
            if headings[i]['level'] - headings[i-1]['level'] > 1:
                print(f"    [!] SKIPPED LEVEL: H{headings[i-1]['level']} -> H{headings[i]['level']}")

        # 6. Check links (internal only)
        links = page.evaluate("""() => {
            return Array.from(document.querySelectorAll('a[href^="/"]')).map(a => ({
                href: a.getAttribute('href'),
                text: a.textContent?.trim()?.substring(0, 30)
            }));
        }""")
        print(f"\n  INTERNAL LINKS: {len(links)}")

        # 7. Count visible text contrast issues (very light text on dark bg)
        low_contrast = page.evaluate("""() => {
            let count = 0;
            document.querySelectorAll('p, span, li, td').forEach(el => {
                const style = getComputedStyle(el);
                const color = style.color;
                // Parse rgb values
                const match = color.match(/rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)/);
                if (match) {
                    const [_, r, g, b] = match.map(Number);
                    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
                    if (luminance < 60 && el.textContent?.trim()) count++;
                }
            });
            return count;
        }""")
        if low_contrast > 0:
            print(f"\n  LOW CONTRAST TEXT ELEMENTS: {low_contrast}")

    browser.close()
    print("\n\nAudit complete.")
