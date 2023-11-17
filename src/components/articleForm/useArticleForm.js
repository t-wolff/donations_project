import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { getArticle } from '../../api/api';
import { useGlobalArticleContext } from '../../hooks/useGlobalArticleContext';

const useArticleForm = (articleId) => {
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

	useEffect(() => {
		if (articleId) {
			const fetchArticle = async () => {
				const articleData = await getArticle(articleId);
				setArticle(articleData);
			};

			fetchArticle();
		}
	}, [articleId]);

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

		const imgRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/;

		const validationRules = [
			{
				field: 'name',
				test: (val) => val.length >= 3,
				errorMessage: 'name must be at least 3 characters long',
			},
			{
				field: 'brand',
				test: (val) => val.length >= 2,
				errorMessage: 'brand must be at least 2 characters long',
			},
			{
				field: 'image',
				test: (val) => imgRegex.test(val),
				errorMessage: 'img url is not valid',
			},
			{
				field: 'price',
				test: (val) => val >= 1,
				errorMessage: 'Price must be greater than 1$',
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

export default useArticleForm;
