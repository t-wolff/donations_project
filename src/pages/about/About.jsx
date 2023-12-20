import { useGlobalAuthContext } from "../../hooks";
import { useEffect } from "react";
import FoxImage from '../../assets/fox.png';
import "./About.css";
import StyledButton from "../../components/styledButton/StyledButton";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
		<section className="home-container">
			<header>
				<img src={FoxImage} alt="Fox" />
				<h2>Start Creating Stories Now! </h2>
        <StyledButton color={'orange'}>Sign Up</StyledButton>
        <StyledButton color={'purple'}>Log in</StyledButton>
			</header>

		</section>
	);
};

export default About;
