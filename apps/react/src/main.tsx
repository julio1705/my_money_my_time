import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './app/App';

import Home from './app/router/Home';
import Transactions from './app/router/Transactions';
import Category from './app/router/Category';
import ErrorPage from './app/router/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/transactions',
        element: <Transactions />,
      },
      {
        path: '/transactions/create',
        element: <p>Tela de criação</p>,
      },
      {
        path: '/category',
        element: <Category />
      }
    ]
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
