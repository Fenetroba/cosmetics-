import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthRoute from "./Components/Page_protector/CheckAuth";
import Login from "./Page/Auth/Login";
import Register from "./Page/Auth/Register";
import AllComponent from "./all users/AllComponent";
import AuthLayer from "./Components/Layers/AuthLayer";
import ShopLayer from "./Components/Layers/ShopLayer.jsx";
import Home from "./Page/user/Home";
import AdminLayer from "./Components/Layers/AdminLayer";
import { useEffect } from "react";
import { checkAuthStatus } from "./redux/features/authSlice";
import Profile from "./Components/Users/profile";
import Setting from "./Components/Users/Setting";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import { Toaster } from "sonner";
import UserInfo from "./Components/Admin/UserInfo";
import Cart from "./Page/user/Cart";
import AllUser_Products from "./all users/AllUser_Products";
import ProductCollections from "./Components/Layers/Product_mainLayer";
import Inbox from "./Page/Admin/Inbox";
import User from "./Page/Admin/User";
import Order from "./Page/Admin/Order";
import Payment from './Page/Payment';
import Products from "./Page/Admin/Products";
import EditProduct from "./Page/Admin/EditProduct";
import Contactus from "./all users/Contactus";
import AboutUs from "./all users/AboutUs";

function App() {
  const location = useLocation();
  const { isAuthenticated, user, isLoading, hasCheckedAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasCheckedAuth) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch, hasCheckedAuth]);

  // Show loading state only while checking initial auth status
  if (isLoading && !hasCheckedAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Toaster />
      <main>
        <Routes>
          {/* Public Routes - No Auth Required */}
          <Route path="/" element={<ProductCollections />}>
            <Route index element={<AllComponent />} />
            <Route path="category" element={<AllUser_Products />} />
            <Route path="contact" element={<Contactus/>} />
            <Route path="about us" element={<AboutUs/>} />
          </Route>

          {/* Auth Routes */}
          <Route
            path="/auth"
            element={
              <AuthRoute isAuth={isAuthenticated} user={user}>
                <AuthLayer />
              </AuthRoute>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Protected Shop Routes */}
          <Route
            path="/shop"
            element={
              <AuthRoute isAuth={isAuthenticated} user={user}>
                <ShopLayer />
              </AuthRoute>
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Setting />} />
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <AuthRoute isAuth={isAuthenticated} user={user}>
                <AdminLayer />
              </AuthRoute>
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<AdminDashboard />} />
            <Route path="profile" element={<UserInfo />} />
            <Route path="settings" element={<UserInfo />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="user" element={<User />} />
            <Route path="order" element={<Order />} />
            <Route path="products" element={<Products />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
          </Route>

          {/* Payment Route */}
          <Route
            path="/payment/:orderId"
            element={
              <AuthRoute isAuth={isAuthenticated} user={user}>
                <Payment />
              </AuthRoute>
            }
          />

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
