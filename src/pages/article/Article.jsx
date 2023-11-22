import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalArticleContext } from "../../hooks";

const Article = () => {
  const { articleId } = useParams();
  const { getArticleById, article, isLoading } = useGlobalArticleContext();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  useEffect(() => {
    getArticleById(articleId);
  }, [articleId]);

  return (
    <main className="single-column-container">
      <Link to="/articles">Back To All Articles</Link>
      {article && (
        <div className="article-container">
          <h3 className="article-name">{article.title}</h3>
          <h2 className="article-subTitle">{article.subtitle}</h2>
          <img className="article-img" src={article.img} alt="article-img" />
          <h2 className="article-text">{`${article.text}$`}</h2>
          <h2 className="article-footer">{`${article.footer}$`}</h2>
        </div>
      )}
    </main>
  );
};

export default Article;
