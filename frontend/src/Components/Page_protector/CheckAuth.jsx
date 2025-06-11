import { Navigate, useLocation } from "react-router-dom";
// import PropTypes from 'prop-types';

const AuthRoute = ({ children, isAuth, user }) => {
  const location = useLocation();
 console.log(isAuth)
  // Define route paths

  const login = "/auth/login";
  const register = "/auth/register";
  const startShop = "/category";
  const home = "/";
  const ShopHome = "/shop/home";
  const AdminHome = "/admin/home";
  const UnauthorizedPage = "/unauth-page";
  const ProfilePage = "/shop/profile";
  const SettingsPage = "/shop/settings";
  const cart = "/shop/cart";
 

  // If not authenticated, only allow access to public routes
  if (!isAuth) {
    if (location.pathname === home || 
        location.pathname === startShop || 
        location.pathname === login || 
        location.pathname === register) {
      return <>{children}</>;
    }
    // Redirect to login for all other paths
    return <Navigate to={login} state={{ from: location }} replace />;
  }

  // Handle root path access
  if (location.pathname === home) {
    if (user?.role === "admin") {
      return <Navigate to={AdminHome} replace />;
    }
    return <Navigate to={ShopHome} replace />;
  }

  // Handle admin user routing
  if (user?.role === "admin") {
    // If admin tries to access shop routes, redirect to admin home
    if (location.pathname.includes("/shop")) {
      return <Navigate to={AdminHome} replace />;
    }
    
    // If admin tries to access user profile/settings, redirect to admin home
    if (location.pathname.includes(ProfilePage) || location.pathname.includes(SettingsPage)) {
      return <Navigate to={AdminHome} replace />;
    }

    // Allow admin to access admin routes
    if (location.pathname.includes("/admin")) {
      return <>{children}</>;
    }

    // Redirect all other routes to admin home
    return <Navigate to={AdminHome} replace />;
  }

  // Handle regular user routing
  if (isAuth) {
    // If user tries to access admin routes, redirect to unauthorized page
    if (location.pathname.includes("/admin")) {
      return <Navigate to={UnauthorizedPage} replace />;
    }

    // If user tries to access auth pages (login/register), redirect to shop home
    if (location.pathname === login || location.pathname === register) {
      return <Navigate to={ShopHome} replace />;
    }

    // Allow access to shop routes, profile, and settings
    if (location.pathname.includes("/shop") || 
        location.pathname === cart) {
      return <>{children}</>;
    }

    // Redirect any other routes to shop home
    return <Navigate to={ShopHome} replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;