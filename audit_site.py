"""Capture full-page screenshots of every NexaBridge route + viewport audit."""
from playwright.sync_api import sync_playwright
import os

OUTPUT = "D:/Projects/nexabridge-solutions/audit_screenshots"
os.makedirs(OUTPUT, exist_ok=True)

ROUTES = [
    ("/", "home"),
    ("/services", "services"),
    ("/services/web", "services-web"),
    ("/services/mobile", "services-mobile"),
    ("/services/business", "services-business"),
    ("/about", "about"),
    ("/contact", "contact"),
]

VIEWPORTS = [
    (1440, 900, "desktop"),
    (768, 1024, "tablet"),
    (375, 812, "mobile"),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    for vw, vh, vname in VIEWPORTS:
        context = browser.new_context(viewport={"width": vw, "height": vh})
        page = context.new_page()

        for route, name in ROUTES:
            url = f"http://localhost:3000{route}"
            print(f"  [{vname}] {url}")
            page.goto(url, wait_until="networkidle", timeout=15000)
            page.wait_for_timeout(1500)  # let animations settle
            fname = f"{OUTPUT}/{name}_{vname}.png"
            page.screenshot(path=fname, full_page=True)
            print(f"    -> {fname}")

        context.close()

    browser.close()
    print("\nDone! All screenshots saved.")
