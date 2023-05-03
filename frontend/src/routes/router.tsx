import { createBrowserRouter } from "react-router-dom";
import UserMainLayout from "../layouts/UserMainLayout";
import UserMainPage from "../pages/UserMainPage/UserMainPage";
import SellerMainPage from "../pages/SellerMainPage/SellerMainPage";
import MyGarden from "../pages/MyGarden/MyGarden";
import SellerMainLayout from "../layouts/SellerMainLayout";
import Reservation from "../components/User/Reservation/Reservation";
import SignInPage from "../pages/SignIn/SignInPage";
import WritingPage from "../pages/WritingPage/WritingPage";
import SellerLoginPage from "../pages/SellerLoginPage/SellerLoginPage";
import ReservationOption from "../components/User/Reservation/ReservationOption";
import SignUpPage from "../pages/SignIn/SignUpPage";
import NonMemberPage from "../pages/SignIn/NonMember";
import LetterPage from "../pages/WritingPage/Letter";
import ProtoPage from "../pages/SellerMainPage/SellerMainProto";
import TestPage from "../pages/TestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserMainLayout />,
    // errorElement: <NotFound />, // 라우터에 없는 경로로 이동시 NotFound 컴포넌트 화면에 띄운다.
    children: [
      { path: "/", element: <UserMainPage /> },
      { path: "/test", element: <TestPage /> },
      { path: "/reservation", element: <Reservation /> },
      { path: "/reservationoption", element: <ReservationOption /> },
      { path: "/mygarden", element: <MyGarden /> },
      { path: "/signin", element: <SignInPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/nonmember", element: <NonMemberPage /> },
      { path: "/writing", element: <WritingPage /> },
      { path: "/letter", element: <LetterPage /> },
    ],
  },
  {
    path: "/",
    element: <SellerMainLayout />,
    // errorElement: <NotFound />, // 라우터에 없는 경로로 이동시 NotFound 컴포넌트 화면에 띄운다.
    children: [
      { path: "/seller", element: <SellerMainPage /> },
      { path: "/seller/login", element: <SellerLoginPage /> },
      { path: "/seller/proto", element: <ProtoPage /> },
    ],
  },
]);

export default router;
