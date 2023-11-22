import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { serverTimestamp } from "firebase/firestore";

export const getAllArticles = async () => {
  const allArticlesArr = [];
  const querySnapshot = await getDocs(collection(db, "articles"));
  querySnapshot.forEach((doc) => {
    allArticlesArr.push({ id: doc.id, ...doc.data() });
  });
  return allArticlesArr;
};

export const getNonArchiveArticles = async () => {
  const articlesArr = [];
  const q = query(collection(db, "articles"), where("isArchive", "==", false));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    articlesArr.push({ id: doc.id, ...doc.data() });
  });
  return articlesArr;
};

export const getArticle = async (articleId) => {
  try {
    const docRef = doc(db, "articles", articleId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document");
      return null;
    }
  } catch (error) {
    console.error(`Error during getArticle: ${error}`);
    return null;
  }
};

export const toggleIsArchive = async (article) => {
  try {
    await setDoc(doc(db, "articles", article.id), {
      ...article,
      isArchive: !article.isArchive,
    });
  } catch (error) {
    console.error(`Error during toggleIsArchive: ${error}`);
  }
};

export const addArticle = async (data) => {
  try {
    await addDoc(collection(db, "articles"), {
      ...data,
      timeStamp: serverTimestamp(),
      isArchive: false,
    });
  } catch (error) {
    console.log(`Error during addArticle: ${error}`);
  }
};
