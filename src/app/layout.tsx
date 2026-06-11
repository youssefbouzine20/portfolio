import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/ui/CustomCursor';
import ASMRBackground from '@/components/ui/ASMRBackground';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://youssefbouzine.dev'),
  title: 'Youssef Bouzine | Big Data & AI Engineering',
  description:
    'Engineering student in Big Data & AI at ENSATÉ. Specializing in Python, machine learning, ETL pipelines, AI agents, and containerized deployments with Docker. Actively seeking an internship.',
  openGraph: {
    title: 'Youssef Bouzine | Big Data & AI Engineering',
    description:
      'Engineering student in Big Data & AI at ENSATÉ. Specializing in Python, machine learning, ETL pipelines, AI agents, and containerized deployments.',
    url: 'https://youssefbouzine.dev',
    siteName: 'Youssef Bouzine Portfolio',
    images: [
      {
        url: '/profile.jpg',
        width: 800,
        height: 1132,
        alt: 'Youssef Bouzine',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Youssef Bouzine | Big Data & AI Engineering',
    description: 'Engineering student in Big Data & AI at ENSATÉ. Seeking an internship in data engineering or machine learning.',
    images: ['/profile.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-[#0a0a0c] text-white min-h-screen cursor-none antialiased`}>
        {/* Global ASMR canvas — fixed, z-0, renders behind everything */}
        <ASMRBackground />
        <CustomCursor />
        {/* All page content sits above the canvas */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
