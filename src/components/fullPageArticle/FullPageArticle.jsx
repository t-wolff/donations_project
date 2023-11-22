import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalArticleContext } from "../../hooks";
import './FullPageArticle.css';

const FullPageArticle = ({isManage}) => {
  const { articleId } = useParams();
  const { getArticleById, article, isLoading } = useGlobalArticleContext();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  useEffect(() => {
    getArticleById(articleId);
  }, [articleId]);

  return (
    <section className={isManage ? 'manage-full-article-container' : 'full-article-container'}>
      <Link to={isManage ? '/admin/manageArticles' : '/articles'} className="full-article-back-link">Back To All Articles</Link>
      {article && (
        <div className="article-container">
          <h2 className="article-name">{article.title}</h2>
          <h3 className="article-subTitle">{article.subtitle}</h3>
          <img className="article-img" src={article.img} alt="article-img" />
          <p className="article-text">{`${article.body}`}</p>
          <h5 className="article-footer">{`${article.footer}`}</h5>
        </div>
      )}
    </section>
  );
};

export default FullPageArticle;
