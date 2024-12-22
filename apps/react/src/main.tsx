import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './app/App';

import Home from './app/router/Home';
import TransactionsListing from './app/router/TransactionsListing';
import TransactionsCreate from './app/router/TransactionsCreate';
import TransactionsEdit from './app/router/TransactionsEdit';
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
        element: <TransactionsListing />,
      },
      {
        path: '/transactions/create',
        element: <TransactionsCreate />,
      },
      {
        path: '/transactions/edit/:id',
        element: <TransactionsEdit />,
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
