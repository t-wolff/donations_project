import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useNewArticle from "./useNewArticle";
import imgSvg from "../../assets/add-photo.svg";

import Input from "../input/Input";
import "./NewArticle.css";

const NewArticle = ({ articleId }) => {
  const { article, errors, handleChange, handleSubmit, image, percentLoad, uploadFile} = useNewArticle();
  const [file, setFile] = useState(null);

  const fields = [
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter title here...",
      value: article.title,
      error: errors.title,
    },
    {
      id: "subtitle",
      label: "Subtitle",
      type: "text",
      placeholder: "Enter subtitle here...",
      value: article.subtitle,
      error: errors.subtitle,
    },
    {
      id: "body",
      label: "Body",
      type: "textarea",
      placeholder:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit beatae odit officiis ex iure amet consectetur repellendus eveniet saepe. Sunt?",
      value: article.body,
      error: errors.body,
      class: "article-body",
    },
    {
      id: "footer",
      label: "Footer",
      type: "text",
      placeholder: "Author: Jhonny Appleseed",
      value: article.footer,
      error: errors.footer,
    },
  ];

  useEffect(() => {
    file && uploadFile(file);
  }, [file]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = handleSubmit(e)
    if(res) {
      console.log(res)
    };
  };

  return (
    <div className="new-article-container">
      <header className="new-article-header">
        <h2>New Article</h2>
        <Link to="/admin/manageArticles" className="back-link">
          Cancel
        </Link>
      </header>
      <div className="new-article-form">
        <div>
          {fields.map((input) => (
            <div key={input.id}>
              <div className={`new-article-input ${input.class}`}>
                <label htmlFor={input.id}>{input.label}</label>
                <textarea
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={(e) => handleChange(e)}
                  value={input.value}
                />
              </div>
              <span className="article-error">{input.error}</span>
            </div>
          ))}
        </div>
        {/* <h4>image</h4> */}
        <form onSubmit={handleAdd} className="img-form">
          <label htmlFor="file">{image ? <img src={image}/> : <img className="svg-img" src={imgSvg}/>}</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <button type="submit" disabled={percentLoad !== null && percentLoad < 100}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewArticle;
