import type { Metadata } from "next";
import { MobileServiceContent } from "./MobileServiceContent";

export const metadata: Metadata = {
  title: "Mobile Application Development",
  description:
    "Native and cross-platform mobile apps for iOS and Android. React Native, Flutter, Swift, and Kotlin — from concept to App Store launch.",
};

export default function MobileServicePage() {
  return <MobileServiceContent />;
}
