import "./AboutBanner.css";

const AboutBanner = () => {
  return (
    <div className="about-banner-container">
      <h3>Who Are We?</h3>
      <p>
        In the wake of Israel's devastating loss of life on October 7th, equal
        to losing 46,000 Americans in one day. Perpetrated by Hamas barbarians
        and their civilian accomplices. A group has gotten together with
        Jonathan Pollard, to ensure Israel has more security capability for its
        citizens.
        <br />
        There are currently 3 areas we are concentrating on:
        <br />
        <li>
          <span className="about-banner-points">A. The IDF</span> - we are
          committed to finding the best equipment for our IDF soldiers' needs
          including our amazing reservists.
        </li>
        <br />
        <li>
          <span className="about-banner-points">
            B. Civil Guard First Response Units
          </span>{" "}
          - we are dedicating our efforts to those brave volunteers who are
          taking on the responsibility of protecting their communities, both big
          and small from incursions of terrorists.
        </li>
        <br />
        <li>
          <span className="about-banner-points">
            C. The Police and other Security forces
          </span>{" "}
          - we are investing in their equipment to ensure they have the proper
          tools to encounter any situation that presents itself as the last line
          of defense for Israel's citizenry.
        </li>
      </p>
    </div>
  );
};

export default AboutBanner;
