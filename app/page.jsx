import Hero from "../components/mainpage/Hero"
import HowMain from "@/components/howitworks/HowMain"
import GalleryMain from "@/components/gallery/GalleryMain"
import LastSectionMain from "@/components/lastsectioin/LastSectionMain"
import Marquee from "@/components/mainpage/Marquee"
export default function Home() {
  return (
    <main
      className=""
    >
      <Hero />
      <Marquee />
      <HowMain />
      <GalleryMain />
      <LastSectionMain />
    </main>
  )
}

//if i add classname test for main parent div, i get the bag bars on the right and bottom of the screen
