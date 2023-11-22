import { useEffect } from "react";
import "./Contact.css";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <section className="contact-container"></section>;
};

export default Contact;
