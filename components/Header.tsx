import { profile } from "@/data";

export default function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top">
        {profile.name}
      </a>
      <nav aria-label="Sections">
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>
    </header>
  );
}
