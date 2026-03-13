import type { Metadata } from "next";
import { BusinessServiceContent } from "./BusinessServiceContent";

export const metadata: Metadata = {
  title: "IT Business Solutions",
  description:
    "Strategic IT consulting, digital transformation, AI automation, and process automation. Transform how your business operates and competes.",
};

export default function BusinessServicePage() {
  return <BusinessServiceContent />;
}
