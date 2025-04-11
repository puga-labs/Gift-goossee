import CurveText from "./CurveText"
import MainButtons from "./MainButtons"
import Image from "next/image"
import HeroBoxesBottom from "./HeroBoxesBottom"

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-purple-200 flex flex-col items-center justify-center relative bg-grid">
      <GoosseeHero />
      <MainButtons />
      <div className="my-12"/>
      <HeroBoxesBottom />
    </div>
  )
}

export default Hero

const GoosseeHero = () => {
  return (
    <div className=" mb-[-200px] pointer-events-none select-none">
      <Image
        src="/hero-goossee2.png"
        alt="Goossee"
        width={600}
        height={300}
        priority
      />
    </div>
  )
}




