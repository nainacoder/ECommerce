import React from 'react';
import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import Home from "../components/Home";
import Login from "../pages/Login";
import CartPage from "../pages/CartPage";
import Header from "../components/Header";
import ProductDetail from "../components/ProductDetails";
import SuccessPage from "../pages/SuccessPage";
import UserDetails from "../pages/ProfilePage";
import ElectronicsPage from "../pages/ElectronicsPage"
import JeweleryPage from "../pages/JeweleryPage";
import MensClothingPage from "../pages/MensClothingPage";
import WomensClothingPage from "../pages/WomensClothingPage";

const Layout = ({ children }) => {
  const location = useLocation();
  const showHeader = location.pathname !== "/";
 
  return (
    <>
      {showHeader && <Header />} <main>{children}</main>
    </>
  );
};
// const Layout = () => {
//   return (
//     <>
     
//       <div >
//         {sessionStorage.getItem('jwtToken') ? (
//           <>
//            <Header />
//           <Outlet />
//           </>
//         ) : (
//           <Navigate to={'/'} />
//         )}
//       </div>
//       {/* <Footer /> */}
//     </>
//   );
// };
  // return (
  //   <>
  //     {/* <Header />
  //     <div >
  //       {sessionStorage.getItem('jwtToken') ? (
  //         <Outlet />
  //       ) : (
  //         <Navigate to={'/login'} />
  //       )}
  //     </div> */}
     
  //   </>


  // const router = createBrowserRouter([
  //       {
  //         path: '/login',
  //         element: <Login />,
  //       },
  //       {
  //         path: '/home',
  //         element: <Home />,
  //       },
  //       {
  //         path: '/home/:category',
  //         element: <Home />,
  //       },
  //       {
  //         path: '/home/Profile',
  //         element: <UserDetails />,
  //       },
  //       {
  //         path: '/cartPage',
  //         element: <CartPage />,
  //       },
  //       {
  //         path: '/electronics',
  //         element: <ElectronicsPage />,
  //       },
  //       {
  //         path: '/jewelery',
  //         element: <JeweleryPage />,
  //       },
  //       {
  //         path: "/men's clothing",
  //         element: <MensClothingPage />,
  //       },
  //       {
  //         path: "/women's clothing",
  //         element: <WomensClothingPage />,
  //       },
  //       {
  //         path: "/productDetail/:id",
  //         element: <ProductDetail />,
  //       },
  //       {
  //         path: "/success",
  //         element: <SuccessPage />,
  //       },
  //     ],
  //   // {
  //   //   element: <UnAuthorisedLayout />,
  //   //   children: [
  //   //     {
  //   //       path: '/register',
  //   //       element: <RegistrationForm />,
  //   //     },
  //   //     {
  //   //       path: '/login',
  //   //       element: <LoginForm />,
  //   //     },
  //   //   ],
  //   // },
  // );

  const router =createBrowserRouter([
    {
      element: <Layout children="" />,
      children: [
        {
          path: '/login',
          element: <Login />,
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
{/* <Layout> */}
  //           <Routes>
  //             <Route path="/" element={<Login />}></Route>
  //             <Route path="/home" element={<Home />}></Route>
  //             <Route path="/home/:category" element={<Home />} />
  //             <Route path="/home/Profile" element={<UserDetails />}></Route>
  //             <Route path="/cartPage" element={<CartPage />}></Route>
  //             <Route path="/electronics" element={<ElectronicsPage />}></Route>
  //             <Route path="/jewelery" element={<JeweleryPage />}></Route>
  //             <Route path="/men's clothing" element={<MensClothingPage />}></Route>
  //             <Route path="/women's clothing" element={<WomensClothingPage />}></Route>
  //             <Route
  //               path="/productDetail/:id"
  //               element={<ProductDetail />}
  //             ></Route>
  //             <Route path="/success" element={<SuccessPage />}></Route>
  //           </Routes>
  //         // </Layout>

  // ])
      
  
  



// Layout.propTypes = {
//   children: PropTypes.node.isRequired, // 'children' must be a React node
// };
