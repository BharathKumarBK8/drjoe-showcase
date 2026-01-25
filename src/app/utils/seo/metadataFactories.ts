import { buildSeo } from "./seoSetup";
import { blogs } from "@/app/data/blogs";
import { services } from "@/app/data/services";
import { communityServicesData } from "@/app/data/communityServices";

// Blog metadata
export async function blogMetadata(slug: string) {
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return buildSeo({
      title: "Blog Not Found",
      path: `/blogs/${slug}`,
      noIndex: true,
    });
  }

  return buildSeo({
    title: blog.title,
    description: blog.excerpt,
    path: `/blogs/${slug}`,
    image: blog.image,
    type: "article",
  });
}

// Service / Community Service metadata
export async function serviceMetadata(
  slug: string,
  section: "services" | "community-services",
) {
  const data = section === "services" ? services : communityServicesData;
  const item = data.find((s) => s.slug === slug);

  if (!item) {
    return buildSeo({
      title: "Service Not Found",
      path: `/${section}/${slug}`,
      noIndex: true,
    });
  }

  return buildSeo({
    title: item.title,
    description: item.excerpt,
    path: `/${section}/${slug}`,
    image: item.image,
  });
}
