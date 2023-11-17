import React, { createContext, useState, useEffect } from "react";

import { addArticle, updateArticle, deleteArticle, getAllArticles } from '../api/api';

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      const articlesData = await getAllArticles();
      setArticles(articlesData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const addNewArticle = async (article) => {
    try {
      const newArticle = await addArticle(article);
      setArticles(prevArticles => ([...prevArticles, newArticle]));
    } catch (err) {
      setError(err.message);
    }
  };

  const editArticle = async (articleData) => {
    try {
      const updatedArticle = await updateArticle(articleData, articleData.id);
      setArticles((prevArticles) =>
        prevArticles.map((article) => (article.id === articleData.id ? updatedArticle : article))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const removeArticle = async (id) => {
    try {
      await deleteArticle(id);
      setArticles((prevArticles) =>
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
        articles,
        isLoading,
        error,
        addNewArticle,
        editArticle,
        removeArticle,
        clearError
      }}>
      {children}
    </ArticleContext.Provider>
  );
};
