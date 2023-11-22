import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";
import { storage } from "../../firebase/firebase";
import useNewArticle from "./useNewArticle";
import Input from "../../components/input/Input";
import "./newArticle.css";

const NewArticle = ({ articleId }) => {
  const { article, errors, handleChange, handleSubmit } = useNewArticle();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

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
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
            setImage(downloadURL);
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleAdd = async (e) => {
    e.preventDefault();
    handleSubmit(image);
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
            <div>
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
          <label htmlFor="file">Choose a picture</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <button type="submit" disabled={per !== null && per < 100}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewArticle;
