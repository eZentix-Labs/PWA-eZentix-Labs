import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import ActionButton from "../components/ActionButton.jsx";
import useLinks from "../lib/useLinks.js";

export default function Social() {
  const links = useLinks();

  return (
    <main className="page">
      <div className="container">
        <Header />
        <section className="content">
          <p className="tagline">Social Media Profiles</p>
          <nav className="button-stack" aria-label="Social profiles">
            {links.socials.map((item) => (
              <ActionButton key={item.key} item={item} brand />
            ))}
          </nav>
          <Link className="back-link" to="/">
            ← Back
          </Link>
        </section>
      </div>
    </main>
  );
}
