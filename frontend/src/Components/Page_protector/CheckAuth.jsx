import { Navigate, useLocation } from "react-router-dom";
// import PropTypes from 'prop-types';

const AuthRoute = ({ children, isAuth, user }) => {
  const location = useLocation();
  console.log('Auth status:', { isAuth, userRole: user?.role, path: location.pathname });

  // Define route paths
  const login = "/auth/login";
  const register = "/auth/register";
  const startShop = "/category";
  const home = "/";
  const ShopHome = "/shop/home";
  const AdminHome = "/admin/home";
  const productsAdmin = "/admin/products";
  const Users = "/admin/user";
  const inbox = "/admin/inbox";
  const order = "/admin/order";
  const UnauthorizedPage = "/unauth-page";
  const ProfilePage = "/shop/profile";
  const SettingsPage = "/shop/settings";
  const cart = "/shop/cart";

  // Public routes that don't require authentication
  const publicRoutes = [home, startShop, login, register];

  // If not authenticated
  if (!isAuth) {
    // Allow access to public routes
    if (publicRoutes.includes(location.pathname)) {
      return <>{children}</>;
    }
    // Redirect to login for all other paths
    return <Navigate to={home} state={{ from: location }} replace />;
  }

  // Handle root path access for authenticated users
  if (location.pathname === home) {
    if (user?.role === "admin") {
      return <Navigate to={AdminHome} replace />;
    }
    return <Navigate to={ShopHome} replace />;
  }

  // Handle admin user routing
  if (user?.role === "admin") {
    // Allow admin to access admin routes and specific pages
    if (location.pathname.includes("/admin") || 
        location.pathname === Users ||
        location.pathname === inbox ||
        location.pathname === productsAdmin ||
        location.pathname === order) {
      return <>{children}</>;
    }
    
    // If admin tries to access shop routes, redirect to admin home
    if (location.pathname.includes("/shop")) {
      return <Navigate to={AdminHome} replace />;
    }
    
    // If admin tries to access user profile/settings, redirect to admin home
    if (location.pathname.includes(ProfilePage) || location.pathname.includes(SettingsPage)) {
      return <Navigate to={AdminHome} replace />;
    }

    // Redirect all other routes to admin home
    return <Navigate to={AdminHome} replace />;
  }

  // Handle regular user routing
  if (isAuth) {
    // If user tries to access admin routes or inbox, redirect to unauthorized page
    if (location.pathname.includes("/admin") || 
        location.pathname === Users ||
        location.pathname === inbox ||
        location.pathname === productsAdmin ||
        location.pathname === order) {
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