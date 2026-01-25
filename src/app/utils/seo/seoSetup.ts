import type { Metadata } from "next";

const SITE_NAME = "Dr. Joe's Dental Hospital";
export const SITE_URL = "https://www.drjoesdental.com";
const DEFAULT_DESCRIPTION =
  "Learn more about our dental services and community programs at Dr. Joe's Dental Hospital.";

type SeoParams = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image,
  type = "website",
  noIndex = false,
}: SeoParams): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: image ? [image] : [],
    },
  };
}
