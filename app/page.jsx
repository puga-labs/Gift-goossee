import Hero from "../components/mainpage/Hero"
import HowMain from "../components/howitworks/HowMain"
import GalleryMain from "../components/gallery/GalleryMain"
import LastSectionMain from "../components/lastsectioin/LastSectionMain"

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-x-hidden p-[2vh] space-y-[2vh] bg-#000000 font-lacker"
    >
      <Hero />
      <HowMain />
      <GalleryMain />
      <LastSectionMain />
    </main>
  )
}

//if i add classname test for main parent div, i get the bag bars on the right and bottom of the screen
