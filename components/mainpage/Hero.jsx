import CurveText from "./CurveText"
import MainButtons from "./MainButtons"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ConnectWalletCustom from "../ConnectWalletCustom";
import Image from "next/image"


const Hero = () => {
  return (
    <div className="purpleBox">
      <div className="flex h-full w-full flex-col items-center justify-center relative">
        <div className="absolute top-[26%] left-1/2 transform -translate-x-1/2">
          <CurveText />
        </div>
        <GoosseeHero />
        <MainButtons />
              </div>
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





