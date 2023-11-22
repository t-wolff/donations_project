import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useGlobalArticleContext } from "../../hooks";

const useNewArticle = (articleId) => {
  const navigate = useNavigate();
  const { addNewArticle } = useGlobalArticleContext();

  const [article, setArticle] = useState({
    title: "",
    subtitle: "",
    body: "",
    footer: "",
  });
  const [errors, setErrors] = useState({
    title: null,
    subtitle: null,
    body: null,
    footer: null,
  });

  const handleChange = (e) => {
    setArticle({
      ...article,
      [e.target.id]: e.target.value,
    });
    setErrors((prevState) => ({
      ...prevState,
      [e.target.id]: null,
    }));
  };

  const handleSubmit = (data) => {
    // e.preventDefault();
    let isValid = true;
    const newErrors = {};

    const validationRules = [
      {
        field: "title",
        test: (val) => val.length >= 10,
        errorMessage: "title must be at least 10 characters long",
      },
      {
        field: "subtitle",
        test: (val) => val.length >= 10,
        errorMessage: "subtitle must be at least 10 characters long",
      },
      {
        field: "body",
        test: (val) => val.length >= 100,
        errorMessage: "body must be at least 100 characters long",
      },
      {
        field: "footer",
        test: (val) => val.length >= 10,
        errorMessage: "footer must be at least 10 characters long",
      },
    ];

    validationRules.forEach(({ field, test, errorMessage }) => {
      if (!test(article[field])) {
        newErrors[field] = errorMessage;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      if (articleId) {
        // editArticle(article);
      } else {
        setArticle({ ...article, img: data });
        addNewArticle(article);
      }
      navigate("/");
    }
  };

  return { handleChange, handleSubmit, article, errors };
};

export default useNewArticle;
