import AboutHero from '../components/About/AboutHero';
import Equipment from "../components/About/Equipment";
import WorkProcess from "../components/About/WorkProcess";

function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <AboutHero />
      <Equipment />
      <WorkProcess />
    </div>
  );
}

export default AboutPage;