import type { Metadata } from "next";
import { ServicesPageContent } from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our full suite of IT technical and business solutions — web development, mobile apps, AI automation, consulting, and more.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
