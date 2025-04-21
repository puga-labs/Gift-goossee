import { Geist, Geist_Mono, Luckiest_Guy, Inter } from "next/font/google"
import "./globals.css"

import "@rainbow-me/rainbowkit/styles.css"
import Footer from "../components/Footer"
import Header from "../components/header/Header"
import Providers from "../components/Providers"
import Template from "./template"

export const metadata = {
  title: "Goossee",
  description: "Send gift with vibes",
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
        >
          <Providers>
          <Header />
          <Template>{children}</Template>
          <Footer />
          </Providers>

        </body>
      </html>
  )
}
