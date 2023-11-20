import React, { useEffect, useState } from 'react';
import { doc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../firebase/firebase';
import { useNewArticle } from '../../hooks';

const NewArticle = ({ articleId }) => {
	const { article, errors, handleChange, handleSubmit } = useNewArticle(articleId);

	const [file, setFile] = useState(null);
	const [data, setData] = useState({});
	const [per, setPerc] = useState(null);
	const navigate = useNavigate();

	const fields = [
		{
			id: 'title',
			name: 'Title',
			inputName: 'title',
			value: article.title,
			type: 'text',
			error: errors.title,
		},
		{
			id: 'subtitle',
			name: 'Sub-Title',
			inputName: 'subTitle',
			value: article.subTitle,
			type: 'text',
			error: errors.subTitle,
		},
		{
			id: 'text',
			name: 'Text',
			inputName: 'text',
			value: article.text,
			type: 'text',
			error: errors.text,
		},
		{
			id: 'footer',
			name: 'footer',
			inputName: 'footer',
			value: article.footer,
			type: 'text',
			error: errors.footer,
		},
	];

	useEffect(() => {
		const uploadFile = () => {
			const name = new Date().getTime() + file.name;
			const storageRef = ref(storage, name);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setPerc(progress);
				},
				(error) => {
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setData((prev) => ({ ...prev, img: downloadURL }));
					});
				}
			);
		};

		file && uploadFile();
	}, [file]);

	const handleInput = (e) => {
		const id = e.target.id;
		const value = e.target.value;

		setData({ ...data, [id]: value });
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collection(db, 'articles'), { ...data, timeStamp: serverTimestamp(), isArchive: false});
			navigate(-1);
			
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="new">
			<div className="newContainer">
				<div className="top">
					<h1>title</h1>
				</div>
				<div className="bottom">
					<div className="left">
						<h4>image</h4>
					</div>
					<div className="right">
						<form onSubmit={handleAdd}>
							<div className="formInput">
								<label htmlFor="file">Choose a file</label>
								<input
									type="file"
									id="file"
									onChange={(e) => setFile(e.target.files[0])}
									style={{ display: 'none' }}
								/>
							</div>

							{fields.map((input) => (
								<div className="formInput" key={input.id}>
									<input
										label={input.label}
										id={input.id}
										type={input.type}
										placeholder={input.placeholder}
										onChange={handleInput}
									/>
								</div>
							))}
							<button type="submit" disabled={per !== null && per < 100}>
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewArticle;
