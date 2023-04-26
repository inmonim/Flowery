import { createBrowserRouter } from "react-router-dom";
import UserMainLayout from "../layouts/UserMainLayout";
import UserMainPage from "../pages/UserMainPage/UserMainPage";
import SellerMainPage from "../pages/SellerMainPage/SellerMainPage";
import MyGarden from "../pages/MyGarden/MyGarden";
import SellerMainLayout from "../layouts/SellerMainLayout";
import Reservation from "../pages/Reservation/Reservation";
import SignInSelectPage from "../pages/SignInSelectPage/SignInSelectPage";
import WritingPage from "../pages/WritingPage/WritingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserMainLayout />,
    // errorElement: <NotFound />, // 라우터에 없는 경로로 이동시 NotFound 컴포넌트 화면에 띄운다.
    children: [
      { path: "/", element: <UserMainPage /> },
      { path: "/reservation", element: <Reservation /> },
      { path: "/mygarden", element: <MyGarden /> },
      { path: "/signinselect", element: <SignInSelectPage /> },
      { path: "/writing", element: <WritingPage /> },
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
