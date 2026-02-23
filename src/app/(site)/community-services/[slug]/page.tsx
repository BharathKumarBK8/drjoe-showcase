// src/app/community-services/[slug]/page.tsx
import { communityServicesData } from "@/app/data/communityServices";
import CommunityServicesContent from "./CommunityServiceContent";
import { Metadata } from "next";
import { findCommunityService } from "@/app/utils/seo/fetchers";
import { serviceMetadata } from "@/app/utils/seo/metadataFactories";

interface PageProps {
  params: { slug: string };
}

/* ------------------------------------------------------------------ */
/* Metadata                                                           */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findCommunityService(slug);

  if (!service) {
    return {};
  }

  return serviceMetadata(slug, "community-services");
}

/* ------------------------------------------------------------------ */
/* Static Params                                                      */
/* ------------------------------------------------------------------ */
export async function generateStaticParams() {
  return communityServicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function CommunityServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = findCommunityService(slug);

  if (!service) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "#000" }}>
        <h1>Service Not Found</h1>
        <a
          href="/community-services"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "rgb(0,148,255)",
            color: "#fff",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          Back to Services
        </a>
      </div>
    );
  }

  return <CommunityServicesContent service={service} />;
}
