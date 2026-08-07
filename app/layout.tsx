import type { Metadata } from 'next'
import { Poppins, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const fontSans = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: 'Sagnik Chandra — Machine Learning & AI Researcher',
  description: 'Portfolio of Sagnik Chandra. M.Sc. Data Science & AI student focusing on Deep Learning, NLP, and Massive Graph Analytics.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${fontSans.variable} ${fontMono.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#151312] text-[#FFFFFF] selection:bg-[#C5FF41] selection:text-[#151312]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

