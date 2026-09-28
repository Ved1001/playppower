import React from 'react';
import Link from 'next/link';
import styles from './GlobalFooter.module.css';

export default function GlobalFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Grid Area */}
        <div className={styles.topGrid}>
          <div className={styles.column}>
            <h3>Support</h3>
            <ul>
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">AirCover</Link></li>
              <li><Link href="#">Anti-discrimination</Link></li>
              <li><Link href="#">Disability support</Link></li>
              <li><Link href="#">Cancellation options</Link></li>
              <li><Link href="#">Report neighborhood concern</Link></li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h3>Hosting</h3>
            <ul>
              <li><Link href="#">Airbnb your home</Link></li>
              <li><Link href="#">AirCover for Hosts</Link></li>
              <li><Link href="#">Hosting resources</Link></li>
              <li><Link href="#">Community forum</Link></li>
              <li><Link href="#">Hosting responsibly</Link></li>
              <li><Link href="#">Airbnb-friendly apartments</Link></li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h3>Airbnb</h3>
            <ul>
              <li><Link href="#">Newsroom</Link></li>
              <li><Link href="#">New features</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Investors</Link></li>
              <li><Link href="#">Gift cards</Link></li>
              <li><Link href="#">Airbnb.org emergency stays</Link></li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h3>Meet the Developer</h3>
            <ul>
              <li><Link href="/founder" className={styles.highlight}>Creator Portfolio ✨</Link></li>
              <li><Link href="#">GitHub Repository</Link></li>
              <li><Link href="#">System Architecture</Link></li>
              <li><Link href="#">AI Integrations used</Link></li>
              <li><Link href="#">Component Library</Link></li>
              <li><Link href="#">Contact for hire</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar Area */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <span>© 2026 Airbnb Clone, Inc.</span>
            <span className={styles.dot}>·</span>
            <Link href="#">Terms</Link>
            <span className={styles.dot}>·</span>
            <Link href="#">Sitemap</Link>
            <span className={styles.dot}>·</span>
            <Link href="#">Privacy</Link>
            <span className={styles.dot}>·</span>
            <Link href="#">Your Privacy Choices</Link>
          </div>
          
          <div className={styles.bottomRight}>
            <button className={styles.localeBtn}>
              <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                <path d="M8 .5C3.86.5.5 3.86.5 8s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5S12.14.5 8 .5zm0 14c-1.25 0-2.45-.4-3.44-1.09.8-3.08 2.05-5.91 3.44-8.4.38.68.74 1.37 1.07 2.08-.2.03-.4.05-.62.05h-.72c-.22 0-.44.02-.65.05.07.24.14.48.21.72h1.4c.06.24.12.48.17.73h-1.6c-.1.49-.19.98-.27 1.48h1.8c.02.24.04.49.05.74H7.26c-.05.5-.1 1-.13 1.5h1.74c0 .25 0 .5-.01.75H7.07c-.01.25-.01.5-.02.75h1.89c-.06.74-.15 1.48-.26 2.2-.42.06-.86.1-1.3.1zm1.3-3.66c.11-.72.2-1.46.26-2.2h1.6c-.12 1-.31 1.98-.56 2.94-.4.18-.84.32-1.3.42zm2.08-1.5c.34-1.15.58-2.34.72-3.55h1.36c.21.84.32 1.72.32 2.62 0 .32-.02.63-.06.93h-1.3zm.78-4.55c-.15-1.22-.4-2.42-.76-3.58.46.12.89.29 1.3.5.25.96.44 1.95.55 2.94h-1.35C11.96 5.86 11.66 5.33 11.33 4.81c.21.04.43.09.64.15zm-2.12.56c-.34-.74-.71-1.47-1.1-2.17-.4.69-.77 1.41-1.1 2.15l-.22-.72c.4-.74.83-1.47 1.28-2.18h.08c.45.7.87 1.43 1.27 2.18l-.21.74zm-2.82 1.83h1.83c.09-.5.18-1 .27-1.5h-2.38c.1.5.19 1 .28 1.5zm.3-2.5c.34-.74.7-1.46 1.09-2.15.4.69.76 1.42 1.1 2.16l-.23.75h-1.74l-.22-.76zM4.04 6.78c-.28-1-.48-2.02-.58-3.07h1.4c-.16 1.22-.43 2.41-.81 3.56l-.01-.49zm.65 1.05h1.35c0-.3.02-.6.06-.91.31-.05.61-.12.92-.2-.23-.82-.44-1.65-.6-2.5-.47.16-.92.36-1.35.6-.28.98-.5 1.98-.65 3.01h.27zm-.86 2.37c-.1-.7-.17-1.42-.2-2.14H2.4c.01.62.06 1.22.15 1.8.31-.19.64-.34.98-.48.04.28.09.55.15.82z" />
              </svg>
              English (US)
            </button>
            <button className={styles.localeBtn}>
              <span className={styles.rupee}>₹</span> INR
            </button>
            
            <div className={styles.socials}>
              <Link href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M14 10h3l-1 4h-2v10h-5V14H6v-4h3V8a5 5 0 0 1 5-5h4v4h-3a1 1 0 0 0-1 1v2z"/></svg></Link>
              <Link href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></Link>
              <Link href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
