"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "@/app/components/Section";
import { fadeUp } from "../hooks/animation";
import styles from "@/app/components/Section.module.css";
import Link from "next/link";
import { openWhatsApp } from "../utils/whatsapp";
import { services } from "../data/services";

export default function ServicesPage() {
  return (
    <main className={styles.main}>
      {/* HERO */}
      <Section
        bgImage="/assets/serviceHero1.jpg"
        bgColor="#000"
        textColor="#fff"
        overlay
      >
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible">
          Our Dental Services
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" whileInView="visible">
          From preventive care to advanced dental treatments, we focus on
          comfort, clarity, and long-term results — serving families across
          Madurai with modern, patient-first dentistry.
        </motion.p>
      </Section>

      {/* SERVICES LIST */}
      {services.map((service, index) => {
        const reverse = index % 2 !== 0; // every second service is reversed
        const dark = index % 2 !== 0;

        const imgRef = useRef<HTMLDivElement | null>(null);
        const { scrollYProgress } = useScroll({
          target: imgRef,
          offset: ["start end", "end start"],
        });
        const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

        return (
          <Section
            key={service.id}
            bgColor={dark ? "#000" : "#fff"}
            textColor={dark ? "#fff" : "#000"}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`${styles.flexTwoCols} ${reverse ? styles.reverse : ""}`}
              style={{ gap: "2rem", alignItems: "center" }}
            >
              {/* IMAGE */}
              <motion.div
                ref={imgRef}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "35rem",
                  aspectRatio: "16/9",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                  flexShrink: 0,
                  margin: "0 auto",
                  scale,
                }}
              >
                <motion.img
                  src={service.image}
                  alt={`${service.title} at Dr. Joe’s Dental Hospital`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="lazy"
                />

                {dark && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.35)",
                    }}
                  />
                )}
              </motion.div>

              {/* CONTENT */}
              <div className={styles.flexContent}>
                <h2>{service.title}</h2>
                <p style={{ marginTop: "1.5rem" }}>{service.description}</p>

                {/* LINK TO SLUG PAGE */}
                <Link
                  href={`/services/${service.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "1.5rem",
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: dark ? "#fff" : "#555",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = dark ? "#ccc" : "#000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = dark ? "#fff" : "#555";
                  }}
                >
                  Learn More <span style={{ fontSize: "1.2rem" }}>→</span>
                </Link>
              </div>
            </motion.div>
          </Section>
        );
      })}

      {/* CTA */}
      <Section textColor="#fff" bgImage="/assets/serviceHero2.webp" overlay>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible">
          Book Your Appointment
        </motion.h2>

        <motion.p variants={fadeUp} initial="hidden" whileInView="visible">
          From routine checkups to advanced treatments, our team focuses on
          comfort, clarity, and long-term oral health — so you always know what
          to expect.
        </motion.p>

        <motion.a
          className={styles.btnPrimary}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openWhatsApp}
        >
          Book Appointment
        </motion.a>
      </Section>
    </main>
  );
}
