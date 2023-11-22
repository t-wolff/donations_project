import { AboutBanner, Banner, InstituteBanner } from "../../components";
import "./Home.css";

const Home = () => {
  return (
    <section className="home-container">
      <Banner />
      <InstituteBanner />
      <AboutBanner />
    </section>
  );
};

export default Home;
