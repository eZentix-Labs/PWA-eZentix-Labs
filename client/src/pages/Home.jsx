import Header from "../components/Header.jsx";
import ButtonStack from "../components/ButtonStack.jsx";
import useLinks from "../lib/useLinks.js";

export default function Home() {
  const links = useLinks();

  return (
    <main className="page">
      <div className="container">
        <Header />
        <section className="content">
          <p className="tagline">Making Rural Business Global</p>
          <ButtonStack buttons={links.buttons} />
          <p className="footer-note">© {new Date().getFullYear()} eZentix Labs</p>
        </section>
      </div>
    </main>
  );
}
