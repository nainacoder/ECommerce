// import "./App.css";
// import React from 'react';
// import PropTypes from "prop-types";
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Home from "./components/Home";
// import Login from "./pages/Login";
// import CartPage from "./pages/CartPage";
// import Header from "./components/Header";
// import ProductDetail from "./components/ProductDetails";
// import SuccessPage from "./pages/SuccessPage";
// import UserDetails from "./pages/ProfilePage";
// import ElectronicsPage from "./pages/ElectronicsPage"
// import JeweleryPage from "./pages/JeweleryPage";
// import MensClothingPage from "./pages/MensClothingPage";
// import WomensClothingPage from "./pages/WomensClothingPage";

// const Layout = ({ children }) => {
//   const location = useLocation();
//   const showHeader = location.pathname !== "/";

//   return (
//     <>
//       {showHeader && <Header />} <main>{children}</main>
//     </>
//   );
// };

// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//         <Layout>
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
//         </Layout>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

// Layout.propTypes = {
//   children: PropTypes.node.isRequired, // 'children' must be a React node
// };
import React from 'react'
import { RouterProvider } from 'react-router-dom';
import router from './route/router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;