import { Link } from "react-router-dom";
import { useGlobalAuthContext } from "../../hooks";
import "./Navbar.css";
import NavListItem from "./NavListItem";
import logo from "../../assets/star-doodle.svg";

const Navbar = () => {
  const { currentUser } = useGlobalAuthContext();

  const navListItems = [
    {
      to: "/about",
      text: "About Us",
      className: null,
    },
    {
      to: "/articles",
      text: "Articles",
      className: null,
    },
    {
      to: "/contact",
      text: "Contact Us",
      className: null,
    },
    {
      to: currentUser ? "admin/manageArticles" : "admin",
      text: "Administration",
      className: null,
    },
    {
      to: "/donate",
      text: "Donate Now",
      className: "btn login-btn",
    },
  ];

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="navbar-logo-container">
          <img className="navbar-logo-img" src={logo} alt="logo" />
          <h2 className="navbar-logo">EmbraceIsrael</h2>
        </div>
      </Link>
      <ul className="nav-links">
        {navListItems.map((link) => (
          <NavListItem key={link.text} {...link} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
