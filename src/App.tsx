import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { appLoader, authLoader } from './lib/auth';
import { GlobalFallback } from './components/global-fallback';
import { ErrorPage } from '@/pages/error/page';
import { AuthLayout } from '@/layouts/auth/auth-layout';

const router = createBrowserRouter([
  {
    loader: appLoader,
    path: '/',
    hydrateFallbackElement: <GlobalFallback />,
    errorElement: <ErrorPage />,
    lazy: () => import('@/pages/home/page'),
  },
  {
    loader: authLoader,
    path: 'auth',
    hydrateFallbackElement: <GlobalFallback />,
    errorElement: <ErrorPage />,
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        lazy: () => import('@/pages/auth/login/page'),
      },
      {
        path: 'forgot-password',
        lazy: () => import('@/pages/auth/forgot-password/page'),
      },
      {
        path: 'reset-password',
        lazy: () => import('@/pages/auth/reset-password/page'),
      },
      {
        path: 'auto-login',
        lazy: () => import('@/pages/auth/auto-login/page'),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
