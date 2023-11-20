import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { getArticle } from '../../api/api';
import { useGlobalArticleContext } from '../../hooks/useGlobalArticleContext';

const useNewArticle = (articleId) => {
	const navigate = useNavigate();

	const [article, setArticle] = useState({
		title: '',
		subTitle: '',
		image: '',
		text: '',
		footer: '',
	});
	const [errors, setErrors] = useState({
		title: null,
		subTitle: null,
		image: null,
		text: null,
		footer: null,
	});

	// useEffect(() => {
	// 	if (articleId) {
	// 		const fetchArticle = async () => {
	// 			const articleData = await getArticle(articleId);
	// 			setArticle(articleData);
	// 		};

	// 		fetchArticle();
	// 	}
	// }, [articleId]);

	const { addNewArticle, editArticle } = useGlobalArticleContext();

	const handleChange = (e) => {
		setArticle({
			...article,
			[e.target.name]: e.target.value,
		});
		setErrors((prevState) => ({
			...prevState,
			[e.target.name]: null,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let isValid = true;
		const newErrors = {};

		const validationRules = [
			{
				field: 'title',
				test: (val) => val.length >= 10,
				errorMessage: 'title must be at least 10 characters long',
			},
			{
				field: 'subtitle',
				test: (val) => val.length >= 10,
				errorMessage: 'subtitle must be at least 10 characters long',
			},
			{
				field: 'text',
				test: (val) => val.length >= 100,
				errorMessage: 'text must be at least 100 characters long',
			},
			{
				field: 'footer',
				test: (val) => val.length >= 10,
				errorMessage: 'footer must be at least 10 characters long',
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
				editArticle(article);
			} else {
				addNewArticle(article);
			}
			navigate('/');
		}
	};

	return { handleChange, handleSubmit, article, errors };
};

export default useNewArticle;
