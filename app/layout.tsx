import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: 'Sagnik Chandra — ML & AI Researcher | Portfolio',
  description: 'Portfolio of Sagnik Chandra. M.Sc. Data Science & AI student focusing on Deep Learning, NLP, and Massive Graph Analytics.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${fontSans.variable} ${fontMono.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#0E0D0D] text-[#E5E5E5] selection:bg-[#C5FF41] selection:text-[#0E0D0D]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
