import Header from "@/components/Header";
import PacketHero from "@/components/PacketHero";
import Capture from "@/components/Capture";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <div id="top">
        <Header />
        <main>
          <PacketHero />
          <Capture />
          <Experience />
        </main>
      </div>
      <Contact />
    </>
  );
}
