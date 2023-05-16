import { createBrowserRouter } from "react-router-dom";
import UserMainLayout from "../layouts/UserMainLayout";
import UserMainPage from "../pages/UserMainPage/UserMainPage";
import SellerMainPage from "../pages/Seller/SellerMainPage/SellerMainPage";
import MyGarden from "../pages/MyGarden/MyGarden";
import SellerMainLayout from "../layouts/SellerMainLayout";
import Reservation from "../components/User/Reservation/Reservation";
import SignInPage from "../pages/SignIn/SignInPage";
import WritingPage from "../pages/WritingPage/WritingPage";
import SellerLoginPage from "../pages/Seller/SellerLoginPage/SellerLoginPage";
import ReservationOption from "../components/User/Reservation/ReservationOption";
import SignUpPage from "../pages/SignIn/SignUpPage";
import NonMemberPage from "../pages/SignIn/NonMember";
import ProtoPage from "../pages/Seller/SellerMainPage/SellerMainProto";
import TestPage from "../pages/TestPage";
import ReleaseIntro from "../components/ReleasePage/ReleaseIntro";
import UserProtoPage from "../components/ReleasePage/UserProtoPage";
import OrderPage from "../components/User/Reservation/OrderPage";
import SellerBookPage from "../pages/Seller/SellerBookPage/SellerBookPage";
import RealeaseWrite from "../components/ReleasePage/ProtoPage/ReleaseWrite";
import ReleaseExitPage from "../components/ReleasePage/Writing/ReleaseExitPage";
import SellerManagePage from "../pages/Seller/SellerManagePage/SellerManage";
import HowTo from "../components/User/UserMain/HowTo";
import Try from "../components/User/UserMain/Try";

const router = createBrowserRouter([
  { path: "/", element: <UserMainPage /> },
  { path: "/howto", element: <HowTo /> },
  { path: "/Try", element: <Try /> },
  {
    path: "/",
    element: <UserMainLayout />,
    // errorElement: <NotFound />, // 라우터에 없는 경로로 이동시 NotFound 컴포넌트 화면에 띄운다.
    children: [
      { path: "/reservation", element: <Reservation /> },
      { path: "/test", element: <TestPage /> },
      { path: "/reservationoption", element: <ReservationOption /> },
      { path: "/mygarden", element: <MyGarden /> },
      { path: "/signin", element: <SignInPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/nonmember", element: <NonMemberPage /> },
      { path: "/writing", element: <WritingPage /> },
      { path: "/reservationorder", element: <OrderPage /> },
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
      { path: "/seller/book", element: <SellerBookPage /> },
      { path: "/seller/manage", element: <SellerManagePage /> },
    ],
  },
  {
    // 시연용
    path: "/",
    children: [
      { path: "/release", element: <ReleaseIntro /> },
      { path: "/releasewrite", element: <RealeaseWrite /> },
      { path: "/releaseexit", element: <ReleaseExitPage /> },
      { path: "/userproto/:messageId", element: <UserProtoPage /> },
    ],
  },
]);

export default router;
