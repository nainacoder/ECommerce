import React from 'react';
import { useLocation, Outlet, createBrowserRouter } from 'react-router-dom';
import Header from "../components/Header";
import Home from "../components/Home";
import ProductDetail from "../components/ProductDetails";
import CartPage from "../pages/CartPage";
import Login from "../pages/Login";
import SuccessPage from "../pages/SuccessPage";
import UserDetails from "../pages/ProfilePage";
import ElectronicsPage from "../pages/ElectronicsPage"
import JeweleryPage from "../pages/JeweleryPage";
import MensClothingPage from "../pages/MensClothingPage";
import WomensClothingPage from "../pages/WomensClothingPage";

const Layout = () => {
  const location = useLocation();
  const showHeader = location.pathname !== "/login";
 
  return (
    <>
      {showHeader&&<Header />} <Outlet/>
    </>
  );
};


  const router =createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/home/:category',
          element: <Home />,
        },
        {
          path: '/home/Profile',
          element: <UserDetails />,
        },
        {
          path: '/cartPage',
          element: <CartPage />,
        },
        {
          path: '/electronics',
          element: <ElectronicsPage />,
        },
        {
          path: '/jewelery',
          element: <JeweleryPage />,
        },
        {
          path: "/men's clothing",
          element: <MensClothingPage />,
        },
        {
          path: "/women's clothing",
          element: <WomensClothingPage />,
        },
        {
          path: "/productDetail/:id",
          element: <ProductDetail />,
        },
        {
          path: "/success",
          element: <SuccessPage />,
        },
      ],
    },
  ])
    export default router;