import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthRoute from "./Components/Page_protector/CheckAuth";
import Login from "./Page/Auth/Login";
import Register from "./Page/Auth/Register";
import AllComponent from "./all users/AllComponent";
import AuthLayer from "./Components/Layers/AuthLayer";
import ShopLayer from "./Components/Layers/shopLayer";
import Home from "./Page/user/Home";
import AdminLayer from "./Components/Layers/AdminLayer";
import { useEffect } from "react";
import { checkAuthStatus } from "./redux/features/authSlice";
import Profile from "./Components/Users/profile";
import Setting from "./Components/Users/Setting";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import { Toaster } from "@/components/ui/sonner"


function App() {
  const location = useLocation();
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  console.log("Auth Status:", isAuthenticated, "User:", user, "Current Path:", location.pathname);

  return (
    <div className="min-h-screen">
      <Toaster/>
      
      <main>
        <Routes>
          {/* Public Route */}
          <Route 
            path="/" 
            element={
              <AuthRoute isAuth={isAuthenticated} user={user}>
                <AllComponent />
              </AuthRoute>
            } 
          />

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

          {/* Shop Routes */}
          <Route
            path="/shop"
            element={
              <AuthRoute isAuth={isAuthenticated} user={user}>
                <ShopLayer />
              </AuthRoute>
            }
          >
            <Route path="home" element={<Home isAuthenticated={isAuthenticated} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Setting />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AuthRoute isAuth={isAuthenticated} user={user}>
                <AdminLayer />
              </AuthRoute>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="dashboard" element={<AdminDashboard/>} />
            <Route path="settings" element={<AdminDashboard />} />
          </Route>

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
