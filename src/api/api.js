import axios from 'axios';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { db, } from '../firebase/firebase';

const NEWS_URL = import.meta.env.VITE_SIREN_HISTORY_URL;

export const getAllArticles = async () => {
	const allArticlesArr = []
	const querySnapshot = await getDocs(collection(db, 'articles'));
	querySnapshot.forEach((doc) => {
		allArticlesArr.push({ id: doc.id, ...doc.data() });
	});
	return allArticlesArr;
};

export const getNonArchiveArticles = async () => {
	const articlesArr = []
	const q = query(collection(db, 'articles'), where('isArchive', '==', false));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		articlesArr.push({ id: doc.id, ...doc.data() });
	});
	return articlesArr;
};

export const getArticle = async (articleId) => {
	const q = query(collection(db, 'articles'), where('id', '==', articleId));

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		console.log(doc.id, ' => ', doc.data());
	});};

export const updateArticle = async (article, articleId) => {
	// return await requestArticles('put', `/${articleId}`, article);
};

export const toggleIsArchive = async (article) => {  
	try {
	  await setDoc(doc(db, "articles", article.id), {
		...article,
		isArchive: !article.isArchive,
	  });
  	} catch (error) {
	  console.error("Error during toggleIsArchive:", error);
	}
  };
  

export const addArticle = async (article) => {
	// return await requestArticles('post', '/', article);
};

export const deleteArticle = async (articleId) => {
	// return await requestArticles('delete', `/${articleId}`);
};

const requestNews = async (method) => {
	const res = await axios({
		method,
		url: `${NEWS_URL}`,
	});
	return res.data;
};

export const getNews = async () => {
	return await requestSirens('get');
};
