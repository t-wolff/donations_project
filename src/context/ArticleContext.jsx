import React, { createContext, useState, useEffect } from "react";
import { addArticle, updateArticle, deleteArticle, getAllArticles, getNonArchiveArticles, toggleIsArchive } from '../api/api';

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [allArticles, setAllArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllArticles = async () => {
    try {
      const allArticlesData = await getAllArticles();
      const articlesData = await getNonArchiveArticles();
      setAllArticles(allArticlesData);
      setArticles(articlesData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  const addNewArticle = async (article) => {
    try {
      await addDoc(doc(db, "articles"), { ...article, timeStamp: serverTimestamp() });
      setAllArticles(prevArticles => ([...prevArticles, article]));
    } catch (err) {
      setError(err.message);
    }
  };

  const editArticle = async (articleData) => {
    try {
      const updatedArticle = await updateArticle(articleData, articleData.id);
      setAllArticles((prevArticles) =>
        prevArticles.map((article) => (article.id === articleData.id ? updatedArticle : article))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleArchive = async (articleData) => {
    try {
      await toggleIsArchive(articleData);
    } catch (err) {
      setError(err.message);
    }
  }

  const removeArticle = async (id) => {
    try {
      await deleteArticle(id);
      setAllArticles((prevArticles) =>
        prevA.filter((article) => (article.id !== id))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ArticleContext.Provider
      value={{
        allArticles,
        articles,
        isLoading,
        error,
        addNewArticle,
        editArticle,
        removeArticle,
        clearError,
        fetchAllArticles,
        toggleArchive,
      }}>
      {children}
    </ArticleContext.Provider>
  );
};
