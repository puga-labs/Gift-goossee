import Hero from "../components/mainpage/Hero"
import HowMain from "../components/howitworks/HowMain"
import LeaderboardMain from "../components/leaderboard/LeaderboardMain"
import Marquee from "../components/mainpage/Marquee"
import FAQsection from "../components/FAQsection/FAQsection"



export default function Home() {
  return (
    <main
      className=""
    >
      <Hero />
      <Marquee />
      <HowMain />
      <Marquee />
      <LeaderboardMain />
      <Marquee />
      <FAQsection/>
    </main>
  )
}

//if i add classname test for main parent div, i get the bag bars on the right and bottom of the screen
