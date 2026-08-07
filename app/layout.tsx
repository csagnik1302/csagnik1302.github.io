import type { Metadata } from 'next'
import { Poppins, Geist_Mono } from 'next/font/google'
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
  description: 'Portfolio of Sagnik Chandra. M.Sc. Data Science & AI student @ RKMVERI focusing on LLM Retrieval ("Lost in the Middle"), Graph Analytics, and Unsupervised ML.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${fontSans.variable} ${fontMono.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#0B0F17] text-[#F8FAFC] selection:bg-[#C5FF41] selection:text-[#0B0F17]">
        {children}
      </body>
    </html>
  )
}
