import { useEffect, useRef } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useGlobalArticleContext } from "./hooks";

import {
  Home,
  About,
  Contact,
  NotFound,
  Articles,
  Admin,
  Donate,
} from "./pages";

import {
  ProtectedRoute,
  SharedLayout,
  FullPageArticle,
  NewArticle,
} from "./components";

const routes = [
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "articles",
        children: [
          {
            index: true,
            element: <Articles />,
          },
          {
            path: ":articleId",
            element: <FullPageArticle />,
          },
        ],
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "manageArticles",
            children: [
              {
                index: true,
                element: (
                  <ProtectedRoute>
                    <Articles isManage={true} />
                  </ProtectedRoute>
                ),
              },
              {
                path: ":articleId",
                element: (
                  <ProtectedRoute>
                    <FullPageArticle isManage={true} />
                  </ProtectedRoute>
                ),
              },
            ],
          },
          {
            path: "newArticle",
            element: (
              <ProtectedRoute>
                <NewArticle />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "donate",
        element: <Donate />,
      },
      {
        path: "*",
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
