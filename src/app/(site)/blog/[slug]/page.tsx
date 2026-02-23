import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../BlogPage.module.css";
import ReactMarkdown from "react-markdown";
import { blogs } from "@/app/data/blogs";
import { findBlog } from "@/app/utils/seo/fetchers";
import { blogMetadata } from "@/app/utils/seo/metadataFactories";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type PageProps = {
  params: Promise<{ slug: string }>;
};

/* ------------------------------------------------------------------ */
/* Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = findBlog(slug);

  if (!blog) return {};

  return blogMetadata(slug);
}

/* ------------------------------------------------------------------ */
/* Static Params                                                      */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = findBlog(slug);
  if (!blog) notFound();

  return (
    <main className={styles.blogSlugPage}>
      <article className={styles.article}>
        {/* Header */}
        <header className={styles.header}>
          <p className={styles.meta}>
            {blog.category} · {blog.date} · {blog.readTime}
          </p>

          <h1 className={styles.title}>{blog.title}</h1>

          <p className={styles.excerpt}>{blog.excerpt}</p>
        </header>

        {/* Image */}
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.blogImg}
              src={blog.image}
              alt={blog.title}
              fill
              priority
            />
          </div>
        </div>

        {/* Content */}
        <section className={styles.content}>
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </section>

        {/* Tags */}
        <footer className={styles.tags}>
          <span>Tags:</span>
          {blog.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </footer>
      </article>
    </main>
  );
}
