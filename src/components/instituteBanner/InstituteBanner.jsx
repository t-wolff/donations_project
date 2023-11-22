import idfLogo from "../../assets/idf-sign.webp";
import policeLogo from "../../assets/police-logo.png";
import civilianLogo from "../../assets/shield-circle.svg";
import "./InstituteBanner.css";

const InstituteBanner = () => {
  const institutions = [
    {
      logo: idfLogo,
      header: "IDF",
      text: "Embracing our soldiers, who are risking their lives on the front lines of this war",
      id: 1,
    },
    {
      logo: civilianLogo,
      header: "Civil Guard",
      text: "Strengthening our brave volunteers, who have taken on the responsibility of defending their communities.",
      id: 2,
    },
    {
      logo: policeLogo,
      header: "Police Force",
      text: "Bolstering our police officers, who are fighting crime and holding our last line of defense",
      id: 3,
    },
  ];

  return (
    <div className="institute-container">
      {institutions.map((institute) => (
        <div className="institute" key={institute.id}>
          <div className="institute-logo-background">
            <img
              className="institute-logo"
              src={institute.logo}
              alt={institute.header + "logo"}
            />
          </div>
          <h3>{institute.header}</h3>
          <p>{institute.text}</p>
        </div>
      ))}
    </div>
  );
};

export default InstituteBanner;
