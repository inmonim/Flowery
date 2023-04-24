import { createBrowserRouter } from "react-router-dom";
import UserMainLayout from "../layouts/UserMainLayout";
import MainPage from "../pages/UserMainPage/UserMainPage";
import UserMainPage from "../pages/SellerMainPage/SellerMainPage";
import MyGarden from "../pages/MyGarden/MyGarden";
import SellerMainPage from "../pages/SellerMainPage/SellerMainPage";
import SellerMainLayout from "../layouts/SellerMainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserMainLayout />,
    // errorElement: <NotFound />, // 라우터에 없는 경로로 이동시 NotFound 컴포넌트 화면에 띄운다.
    children: [
      { path: "/", element: <UserMainPage /> },
      { path: "/mygarden", element: <MyGarden /> },
    ],
  },
  {
    path: "/",
    element: <SellerMainLayout />,
    // errorElement: <NotFound />, // 라우터에 없는 경로로 이동시 NotFound 컴포넌트 화면에 띄운다.
    children: [{ path: "/seller", element: <SellerMainPage /> }],
  },
]);

export default router;
