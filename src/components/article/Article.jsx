import { Link } from 'react-router-dom';

const Article = ({ id, title, subTitle, image, text, footer }) => {
  return (
    <div className='article-container'>
      <h2 className='article-name'>
        <Link to={`/products/${id}`}>
          {title}
        </Link>
      </h2>
      <h3 className='article-subTitle'>{subTitle}</h3>
      <Link to={`/products/${id}`}>
        <img className='article-img' src={image} alt='article-img' />
      </Link>
      <p>{text}</p>
      <p>{footer}</p>
    </div>
  );
};
export default Article;