import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useGlobalArticleContext } from "../../hooks";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";

const useNewArticle = (articleId) => {
  const navigate = useNavigate();
  const { addNewArticle, error } = useGlobalArticleContext();
  const [percentLoad, setPercentLoad] = useState(null);
  const [image, setImage] = useState(null);

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

  const uploadFile = (file) => {
	const name = new Date().getTime() + file.name;
	const storageRef = ref(storage, name);
	const uploadTask = uploadBytesResumable(storageRef, file);

	uploadTask.on(
	  "state_changed",
	  (snapshot) => {
		const progress =
		  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		setPercentLoad(progress);
	  },
	  (error) => {
		console.log(error);
	  },
	  () => {
		getDownloadURL(uploadTask.snapshot.ref).then((imgURL) => {
		  setArticle((prevArticle) => ({ ...prevArticle, img: imgURL }));
		  setImage(imgURL);
		});
	  }
	);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
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
        addNewArticle(article);
		if (error) {return error}
      }
      navigate('/admin/manageArticles');
    }
  };

  return { uploadFile, handleChange, handleSubmit, article, errors, percentLoad,image };
};

export default useNewArticle;
