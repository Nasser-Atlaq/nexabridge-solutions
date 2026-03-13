import type { Metadata } from "next";
import { WebServiceContent } from "./WebServiceContent";

export const metadata: Metadata = {
  title: "Web Application Development",
  description:
    "Modern, scalable web applications built with React, Next.js, and cutting-edge technologies. Sub-second load times, 99.9% uptime, and custom architecture.",
};

export default function WebServicePage() {
  return <WebServiceContent />;
}
