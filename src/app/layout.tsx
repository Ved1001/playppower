import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GlobalHeader from '@/components/global/GlobalHeader';
import GlobalFooter from '@/components/global/GlobalFooter';
import { BookingProvider } from '@/context/BookingContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'Airbnb — Luxury Stays & Experiences',
  description: 'Explore beautiful stays, compare prices, choose your dates, and reserve your next getaway.',
  keywords: ['Airbnb', 'Candolim', 'Goa', 'vacation rental', '1BHK', 'jacuzzi'],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Airbnb — Luxury Stays & Experiences',
    description: 'Explore beautiful stays, compare prices, choose your dates, and reserve your next getaway.',
    url: siteUrl,
    siteName: 'Airbnb Clone',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <BookingProvider>
          <GlobalHeader />
          <main>{children}</main>
          <GlobalFooter />
        </BookingProvider>
      </body>
    </html>
  );
}
