import type { Metadata } from "next";
import { AboutPageContent } from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind NexaBridge Solutions. Our mission, vision, core values, and the engineers, designers, and strategists building the future.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
