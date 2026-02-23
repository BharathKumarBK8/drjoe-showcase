"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./BlogPage.module.css";
import { blogs } from "../data/blogs";

export default function BlogPage() {
  return (
    <main className={styles.blogPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dental Care Insights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Expert tips, oral health guides, and updates from Dr. Joe’s Dental
          Hospitals - Madurai.
        </motion.p>
      </section>

      {/* Featured Post */}
      <section className={styles.featured}>
        <motion.article
          className={styles.featuredCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href={`/blog/${blogs[0].slug}`}>
            <img src={blogs[0].image} alt={blogs[0].title} loading="lazy" />
          </Link>
          <div className={styles.featuredContent}>
            <span className={styles.tag}>{blogs[0].category}</span>
            <h2>
              <Link href={`/blog/${blogs[0].slug}`}>{blogs[0].title}</Link>
            </h2>
            <p>{blogs[0].excerpt}</p>
            <div className={styles.meta}>
              {blogs[0].date} · {blogs[0].readTime}
            </div>
          </div>
        </motion.article>
      </section>

      {/* Blog Grid */}
      <section className={styles.grid}>
        {blogs.slice(1).map((blog, i) => (
          <motion.article
            key={blog.id}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
          >
            <Link href={`/blog/${blog.slug}`}>
              <img src={blog.image} alt={blog.title} loading="lazy" />
            </Link>
            <div className={styles.cardContent}>
              <span className={styles.tag}>{blog.category}</span>
              <h3>
                <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
              </h3>
              <p>{blog.excerpt}</p>
              <div className={styles.meta}>
                {blog.date} · {blog.readTime}
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
