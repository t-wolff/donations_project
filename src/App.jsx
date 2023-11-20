import { useEffect, useRef } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useGlobalArticleContext } from './hooks';

import {
	Home,
	About,
	Article,
	ManageArticle,
	Contact,
	NotFound,
	Articles,
	ManageArticles,
	Admin,
	NewArticle,
} from './pages';

import { ProtectedRoute, SharedLayout } from './components';

const routes = [
	{
		path: '/',
		element: <SharedLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'about',
				element: <About />,
			},
			{
				path: 'contact',
				element: <Contact />,
			},
			{
				path: 'articles',
				element: <Articles />,
				children: [
					{
						path: ':articleId',
						element: <Article />,
					},
					{
						path: ':articleId/edit',
						element: (
							<ProtectedRoute>
								{' '}
								<ManageArticle />
							</ProtectedRoute>
						),
					},
				],
			},
			{
				path: 'admin',
				element: <Admin />,
				children: [
					{
						path: 'manageArticles',
						element: (
							<ProtectedRoute>
								<ManageArticles />
							</ProtectedRoute>
						),
					},
					{
						path: 'newArticle',
						element: (
							<ProtectedRoute>
								<NewArticle />
							</ProtectedRoute>
						),
					},
				],
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
];

function App() {
	const router = createBrowserRouter(routes);
	const { error, clearError } = useGlobalArticleContext();

	useEffect(() => {
		if (error) {
		}
	}, [error, clearError]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
