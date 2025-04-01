import Image from "next/image";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#170731]"> 
      <Hero/>               
    </main>        
  );
}

//if i add classname test for main parent div, i get the bag bars on the right and bottom of the screen
 