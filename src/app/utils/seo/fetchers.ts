import { blogs } from "@/app/data/blogs";
import { services } from "@/app/data/services";
import { communityServicesData } from "@/app/data/communityServices";

export function findBlog(slug: string) {
  return blogs.find((b) => b.slug === slug);
}

export function findService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function findCommunityService(slug: string) {
  return communityServicesData.find((s) => s.slug === slug);
}
