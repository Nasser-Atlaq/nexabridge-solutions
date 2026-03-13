import type { Metadata } from "next";
import { ContactPageContent } from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with NexaBridge Solutions. Tell us about your project and get a free consultation from our team of experts.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
