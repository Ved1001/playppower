import React from 'react';
import { Metadata } from 'next';
import styles from './FounderPage.module.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Meet the Founder — Vedant',
  description: 'Explore the portfolio of Vedant, a product-minded software engineer who built this Airbnb-style marketplace experience.',
};

export default function FounderPage() {
  return (
    <div className={styles.pageWrapper}>
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Meet the Developer ✨</div>
          <h1 className={styles.title}>Building thoughtful digital products<br/><span className={styles.gradientText}>with engineering and design.</span></h1>
          <p className={styles.subtitle}>
            Hi, I'm Vedant. I am a product-minded software developer focused on bridging the gap between breathtaking design and robust frontend architecture.
          </p>
        </div>
      </section>

      <section className={styles.bentoSection}>
        <div className={styles.bentoGrid}>
          
          <div className={`${styles.bentoCard} ${styles.cardWide}`}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}>👋</span>
              <h3>About Me</h3>
            </div>
            <p>
              I built this project as an Airbnb-style marketplace experience, focusing heavily on UI quality, reusable components, state management, complex booking interactions, dynamic pricing, and responsive design. My goal is always to deliver a premium product experience from the first interaction to the last.
            </p>
            <div className={styles.techStack}>
              <a href="https://ved1001.github.io/" target="_blank" rel="noopener noreferrer" className={styles.portfolioLinkBtn}>
                Explore my portfolio →
              </a>
            </div>
          </div>

          <div className={`${styles.bentoCard} ${styles.cardLarge}`}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}>🎯</span>
              <h3>Project Showcase</h3>
            </div>
            <p><strong>From interface recreation to a functional marketplace experience.</strong></p>
            <p style={{ marginTop: '12px' }}>
              This is not a static template. I engineered a complete flow featuring property discovery UI, detailed property pages, shared booking state, an interactive calendar, dynamic pricing, guest selection, and a full reservation review process.
            </p>
          </div>

          <div className={styles.bentoCard}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}>⚙️</span>
              <h3>Tech Stack</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <strong>Implemented in this project:</strong>
              <div className={styles.techStack}>
                <span>Next.js 14 App Router</span>
                <span>React</span>
                <span>TypeScript</span>
                <span>CSS Modules</span>
                <span>Context API</span>
              </div>
              <strong style={{ marginTop: '12px' }}>Production Evolution:</strong>
              <div className={styles.techStack}>
                <span>Spring Boot</span>
                <span>Microservices</span>
                <span>Kafka</span>
              </div>
            </div>
          </div>

          <div className={styles.bentoCard}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}>🏗️</span>
              <h3>Project Architecture</h3>
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
              Global Layout<br/>
              ↓ Global Header<br/>
              ↓ BookingContext<br/>
              ↓ Property Page<br/>
              ↓ BookingCard<br/>
              ↓ Pricing Engine<br/>
              ↓ Reservation Modal
            </div>
          </div>

          <div className={`${styles.bentoCard} ${styles.cardWide}`}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}>🤖</span>
              <h3>AI-Assisted Development</h3>
            </div>
            <p>
              <strong>AI-assisted engineering, human-directed product decisions.</strong><br/>
              AI was utilized as a development accelerator for component generation, UI iteration, and implementation planning. However, the architecture, UX design, component logic, state management, and product flow were strictly directed and verified by human insight.
            </p>
          </div>

        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2>Let's build something meaningful.</h2>
          <p>Want to see more of my work or get in touch? I am currently open to new opportunities.</p>
          <div className={styles.ctaButtons}>
            <a href="https://ved1001.github.io/" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
              Visit My Portfolio ↗
            </a>
            <Link href="/" className={styles.secondaryBtn}>Back to Airbnb</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
