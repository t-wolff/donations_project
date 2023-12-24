import { useGlobalArticleContext } from "../../hooks";
import { useEffect } from "react";
import { Banner, InstituteBanner } from "../../components";
import "./About.css";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="home-container">
      <Banner />
      <div className="about-container">
        <h3>Who Are We?</h3>
        <br />
        <p>
          In the wake of Israel's devastating loss of life on October 7th, equal
          to losing 46,000 Americans in one day. Perpetrated by Hamas barbarians
          and their civilian accomplices. A group has gotten together with
          Jonathan Pollard, to ensure Israel has more security capability for
          its citizens.
          <br />
          <br />
          There are currently 3 areas we are concentrating on:
          <li>
            <span className="about-points">A. The IDF</span> - we are committed
            to finding the best equipment for our IDF soldiers' needs including
            our amazing reservists.
          </li>
          <li>
            <span className="about-points">
              B. Civil Guard First Response Units
            </span>{" "}
            - we are dedicating our efforts to those brave volunteers who are
            taking on the responsibility of protecting their communities, both
            big and small from incursions of terrorists.
          </li>
          <li>
            <span className="about-points">
              C. The Police and other Security forces
            </span>{" "}
            - we are investing in their equipment to ensure they have the proper
            tools to encounter any situation that presents itself as the last
            line of defense for Israel's citizenry.
          </li>
          <br />
          Yes, there are many groups that have formed to raise money, however,
          we already have manufacturers, suppliers, and importers with stock for
          immediate purchase. <br />
          <span className="about-points">The equipment includes:</span>
          <li>
            <span className="about-points">1.</span> Ceramic bullet proof vests
            (both 3 & 4 level protection)
          </li>
          <li>
            <span className="about-points">2.</span> Helmets
          </li>
          <li>
            <span className="about-points">3.</span> Infrared cameras with
            automatic encroachment alarms
          </li>
          <li>
            <span className="about-points">4.</span> Bullet proof patrol
            vehicles
          </li>
          <br />
          This is not a fund or non profit. All purchases are done by us or can
          be done by the donors themselves who will receive the invoice.
          <br />
          There are no organizational costs as we are all volunteering our time
          so that our security forces have the best.
          <br />
          <br />
          Again, this direct arrangement with all the various agencies in
          Israel, allow us to use well established manufacturers and importers
          and get the products bought, shipped, and into our soldiers/security
          teams' hands asap.
          <br />
          If you would like to donate or start a group of donors or know of
          others who would like to take an active role in support for the Jewish
          state and its people let me know in an email to
          EmbraceIsrael@proton.me.
          <br />
          <br />
          May we all stand together in support as Israel fights today's evil.
          <br />
          Jacob Wolf
        </p>
      </div>
      <InstituteBanner />
    </section>
  );
};

export default About;
