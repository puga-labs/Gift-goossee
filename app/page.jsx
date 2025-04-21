import Hero from "../components/mainpage/Hero"
import HowMain from "../components/howitworks/HowMain"
import LeaderboardMain from "../components/leaderboard/LeaderboardMain"
import Marquee from "../components/mainpage/Marquee"
import FAQsection from "../components/FAQsection/FAQsection"
import ButtonTop from "../components/elements/ButtonTop"

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <HowMain />
      <Marquee />
      <LeaderboardMain />
      <Marquee />
      <FAQsection />
      <ButtonTop />
    </main>
  )
}

//if i add classname test for main parent div, i get the bag bars on the right and bottom of the screen
