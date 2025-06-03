import { Navigate, useLocation } from "react-router-dom";
// import PropTypes from 'prop-types';

const AuthRoute = ({ children, isAuth, user }) => {
  const location = useLocation();
 console.log(isAuth)
  // Define route paths

  const login = "/login";
  const register = "/register";
  const home = "/";
  const ShopHome = "/shop/home";
  const AdminHome = "/admin/home";
  const UnauthorizedPage = "/unauth-page";
  const ProfilePage = "/profile";
  const SettingsPage = "/settings";
  const DashboardPage = "/dashboard";

  // If not authenticated, only allow access to login, register, and home
  if (!isAuth) {
    if (location.pathname === home || 
        location.pathname.includes(login) || 
        location.pathname.includes(register)) {
      return <>{children}</>;
    }
    // Redirect to login for all other paths
    return <Navigate to={login} />;
  }

  // Check root path access for authenticated users
  if(location.pathname === "/" ){
    if (user?.role === "admin") {
      return <Navigate to={AdminHome} />;
    } else {
      return <Navigate to={ShopHome} />;
    }
  }

  // Check authenticated user access to auth pages
  if (
    isAuth &&
    (location.pathname.includes(login) ||
      location.pathname.includes(register))
  ) {
    if (user?.role === "admin") {
      return <Navigate to={AdminHome} />;
    } else {
      return <Navigate to={ShopHome} />;
    }
  }

  // Check admin route access
  if (isAuth && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to={UnauthorizedPage} />;
  }

  // Check admin access to shop routes
  if (
    isAuth &&
    user?.role === "admin" &&
    location.pathname.includes(ShopHome)
  ) {
    return <Navigate to={AdminHome} />;
  }

  // Check profile access
  if (isAuth && location.pathname.includes(ProfilePage)) {
    if (!user) {
      return <Navigate to={login} />;
    }
  }

  // Check settings access
  if (isAuth && location.pathname.includes(SettingsPage)) {
    if (!user) {
      return <Navigate to={login} />;
    }
  }

  // Check dashboard access
  if (isAuth && location.pathname.includes(DashboardPage)) {
    if (!user) {
      return <Navigate to={login} />;
    }
    if (user?.role === "admin" && !location.pathname.includes("admin")) {
      return <Navigate to={AdminHome} />;
    }
  }

  // Check shop routes access
  if (isAuth && location.pathname.includes("/shop") && !location.pathname.includes(ShopHome)) {
    if (!user) {
      return <Navigate to={login} />;
    }
    if (user?.role === "admin") {
      return <Navigate to={AdminHome} />;
    }
  }

  return <>{children}</>;
};

export default AuthRoute;
