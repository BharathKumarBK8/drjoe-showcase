import Section from "@/app/components/Section";
import ServiceContent from "./ServiceContent";
import { services } from "@/app/data/services";
import { Metadata } from "next";
import { findService } from "@/app/utils/seo/fetchers";
import { serviceMetadata } from "@/app/utils/seo/metadataFactories";

interface ServicePageProps {
  params: { slug: string };
}

/* ------------------------------------------------------------------ */
/* Metadata                                                           */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) {
    return {
      title: "Service Not Found | Dr. Joe's Dental Hospital",
      description: "The requested service could not be found.",
    };
  }

  return serviceMetadata(slug, "services");
}

/* ------------------------------------------------------------------ */
/* Static Params                                                      */
/* ------------------------------------------------------------------ */
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

/* ------------------------------------------------------------------ */
/* Page Component                                                     */
/* ------------------------------------------------------------------ */
export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) {
    return (
      <main>
        <Section bgColor="#fff" textColor="#000">
          <h1>Service Not Found</h1>
          <p>Sorry, the service you are looking for does not exist.</p>
        </Section>
      </main>
    );
  }

  return (
    <>
      <ServiceContent service={service} />
    </>
  );
}
