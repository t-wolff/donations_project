import React, { createContext, useState, useEffect } from "react";
import {
  addArticle,
  updateArticle,
  getAllArticles,
  getNonArchiveArticles,
  toggleIsArchive,
  getArticle,
} from "../firebase/api";

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [allArticles, setAllArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
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

  const addNewArticle = async (articleData) => {
    try {
      const article = await addArticle(...articleData);
      setAllArticles((prevArticles) => [...prevArticles, article]);
    } catch (err) {
      setError(err.message);
    }
  };

  const editArticle = async (articleData) => {
    try {
      const updatedArticle = await updateArticle(articleData, articleData.id);
      setAllArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === articleData.id ? updatedArticle : article
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleArchive = async (articleData) => {
    try {
      await toggleIsArchive(articleData);
      fetchAllArticles();
    } catch (err) {
      setError(err.message);
    }
  };

  const getArticleById = async (articleId) => {
    try {
      const articleData = await getArticle(articleId);
      setArticle(articleData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
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
        article,
        isLoading,
        error,
        addNewArticle,
        editArticle,
        getArticleById,
        clearError,
        fetchAllArticles,
        toggleArchive,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};
