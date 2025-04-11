import { Geist, Geist_Mono, Luckiest_Guy } from "next/font/google"
import "./globals.css"
import '@rainbow-me/rainbowkit/styles.css';
import Footer from "../components/Footer"
import Header from "../components/Header"
import Providers from "../components/Providers"

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

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-luckiest",
})

export default function RootLayout({ children }) {
  return (
    <Providers>
    <html lang="en">

      <body
        className={`${geistSans.variable} ${luckiestGuy.variable} ${geistMono.variable} antialiased`}
      >
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
      </body>

    </html>
    </Providers>
  )
}
