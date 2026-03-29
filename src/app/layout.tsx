import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/ui/CustomCursor';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "Ayoub Baidane | Data Engineering & AI",
  description: "I am a Data Engineer on a journey to become an AI Solution Architect.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${poppins.variable} font-poppins bg-background text-white min-h-screen cursor-none`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
