import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { appLoader, authLoader } from './lib/auth';
import { GlobalFallback } from './components/global-fallback';
import { ErrorPage } from '@/pages/error/page';

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
    hydrateFallbackElement: <GlobalFallback />,
    errorElement: <ErrorPage />,
    path: '/login',
    lazy: () => import('@/pages/login/page'),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
