import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getArticle } from '../../api/api';

import { useGlobalArticleContext } from '../../hooks';

const useArticle = () => {
	const { articleId } = useParams();

	const navigate = useNavigate();

	const [article, setArticle] = useState({});

	const { removeArticle } = useGlobalArticleContext();

	useEffect(() => {
		const fetchArticle = async () => {
			const articleData = await getArticle(articleId);
			setArticle(articleData);
		};

		fetchArticle();
	}, [articleId]);

	const handleDelete = () => {
		removeArticle(articleId);
		navigate('/');
	};

	return { article, handleDelete };
};
export default useArticle;
