import type { Metadata } from "next";
import HomePageClient from "./components/home-page-client";
import { SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return <HomePageClient />;
}
