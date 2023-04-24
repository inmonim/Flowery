import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import MainPage from '../pages/UserMainPage/UserMainPage';
import SellerMainPage from '../pages/SellerMainPage/SellerMainPage';
import MyGarden from '../pages/MyGarden/MyGarden';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    // errorElement: <NotFound />, // 라우터에 없는 경로로 이동시 NotFound 컴포넌트 화면에 띄운다.
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/seller', element: <SellerMainPage />},
      { path: '/mygarden', element: <MyGarden />}
    ],
  },
]);

export default router;
