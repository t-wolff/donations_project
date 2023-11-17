import axios from 'axios';

const BASE_ARTICLE_URL = import.meta.env.VITE_BASE_URL;
const SIRENS_URL = import.meta.env.VITE_SIREN_HISTORY_URL;

const requestArticles = async (method, endpoint, data = null) => {
	const res = await axios({
		method,
		url: `${BASE_ARTICLE_URL}${endpoint}`,
		data,
	});
	return res.data;
};

export const getAllArticles = async () => {
	return await requestArticles('get', '/');
};

export const getArticle = async (articleId) => {
	return await requestArticles('get', `/${articleId}`);
};

export const updateArticle = async (article, articleId) => {
	return await requestArticles('put', `/${articleId}`, article);
};

export const addArticle = async (article) => {
	return await requestArticles('post', '/', article);
};

export const deleteArticle = async (articleId) => {
	return await requestArticles('delete', `/${articleId}`);
};

const requestSirens = async (method) => {
	const res = await axios({
		method,
		url: `${SIRENS_URL}`,
	});
	return res.data;
};

export const getSirens = async () => {
    return await requestSirens('get') 
}