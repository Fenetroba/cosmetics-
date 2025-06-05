import React, { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LucideMenu, LucideShoppingCart, Search, UserPen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/features/authSlice";
import { selectCartItems, fetchCart } from "@/redux/features/cartSlice";

const Header = ({ isAuthenticated }) => {
  const [clickCart, setclickCart] = useState();
  const [navVisible, setNavVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const LogOutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-10 relative">
      <div className="text-xl font-bold">Logo</div>
      <div className="flex items-center md:hidden">
        <div
          className="absolute right-3 text-2xl cursor-pointer"
          onClick={() => setNavVisible(!navVisible)}
        >
          <LucideMenu />
        </div>
      </div>
      <nav
        className={`flex flex-col md:flex-row items-center space-x-0 md:ml-18 md:space-x-3.5 mt-9 md:mt-0 ${
          navVisible ? "visible" : "max-md:hidden"
        } md:visible`}
      >
        <div className="max-sm:mb-3">
          <a href="/" className="hover:underline">
            HOME
          </a>
        </div>

        <NavigationMenu className="max-md:my-10">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>BATH & BODY</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="md:w-[500px]">
                  Snail Oil
                </NavigationMenuLink>
                <NavigationMenuLink>Avocado Oil</NavigationMenuLink>
                <NavigationMenuLink>Wankot</NavigationMenuLink>
                <NavigationMenuLink>Vaslin</NavigationMenuLink>
                <NavigationMenuLink>Others</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>HAIR CARE</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="md:w-[500px]">
                Castor Oil
                </NavigationMenuLink>
                <NavigationMenuLink>Coconut Oil</NavigationMenuLink>
                <NavigationMenuLink>Argan Oil</NavigationMenuLink>
                <NavigationMenuLink>Olive Oil</NavigationMenuLink>
                <NavigationMenuLink>Jojoba Oil</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>SKIN CARE</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="sm:w-[500px]">
                Tea Tree Oil
                </NavigationMenuLink>
                <NavigationMenuLink>Grapeseed Oil</NavigationMenuLink>
                <NavigationMenuLink>Sweet Almond Oil</NavigationMenuLink>
                <NavigationMenuLink>Rosehip Oil</NavigationMenuLink>
                <NavigationMenuLink>Jojoba Oil</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="max-md:my-6">
          <a href="#" className="hover:underline">
            CONTACT
          </a>
        </div>
        <div>
          <a href="#" className="hover:underline">
            ABOUT US
          </a>
        </div>
        <div
          className="max-sm:mt-3 max-sm:mr-5 cursor-pointer"
          onClick={() => setSearchVisible(!searchVisible)}
        >
          <Search className="sm:my-3" />
        </div>
        {searchVisible && (
          <div className="6 top-5">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded px-2 py-1"
            />
          </div>
        )}
      </nav>
      <div className=" my-4 flex flex-col sm:flex-row space-y-2.5 space-x-8.5 items-center ">
        {isAuthenticated && (
          <Link to="/shop/cart">
            <p className="flex cursor-pointer items-center relative">
              <LucideShoppingCart />
              <span className="absolute left-[14px] top-[-5px] bg-red-900 rounded-full px-1.5 text-white font-bold">
                {cartItems?.length || 0}
              </span>
            </p>
          </Link>
        )}
        {console.log(isAuthenticated)}
        {isAuthenticated ? (
          <Button
            className="max-md:w-[200px] cursor-pointer"
            onClick={LogOutHandler}
          >
            {" "}
            LOGOUT
          </Button>
        ) : (
          <Button className=" max-md:w-[200px] cursor-pointer">
            <Link to="/auth/login">LOGIN </Link>
          </Button>
        )}
        {
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserPen className=" cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/shop/profile">Profile</Link>{" "}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/shop/settings">Setting</Link>{" "}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
    </section>
  );
};

export default Header;
