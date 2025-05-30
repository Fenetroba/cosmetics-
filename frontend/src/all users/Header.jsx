import React, { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { BaggageClaim, LucideMenu, Search, User } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [navVisible, setNavVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-10 relative">
      <div className="text-xl font-bold">Logo</div>
      <div className="flex items-center md:hidden">
        <div className="absolute right-3 text-2xl cursor-pointer" onClick={() => setNavVisible(!navVisible)}>
          <LucideMenu />
        </div>
      </div>
      <nav className={`flex flex-col md:flex-row items-center space-x-0 md:ml-18 md:space-x-3.5 mt-9 md:mt-0 ${navVisible ? "visible" : "max-md:hidden"} md:visible`}>
        <div className='max-sm:mb-3'>
          <a href="/" className="hover:underline">HOME</a>
        </div>

        <NavigationMenu className='max-md:my-10'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>BATH & BODY</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="md:w-[500px]">Link</NavigationMenuLink>
                <NavigationMenuLink>Link</NavigationMenuLink>
                <NavigationMenuLink>Link</NavigationMenuLink>
                <NavigationMenuLink>Link</NavigationMenuLink>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>HAIR CARE</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="md:w-[500px]">Link</NavigationMenuLink>
                <NavigationMenuLink>Link</NavigationMenuLink>
                <NavigationMenuLink>Link</NavigationMenuLink>
                <NavigationMenuLink>Link</NavigationMenuLink>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>SKIN CARE</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="sm:w-[500px]">Link</NavigationMenuLink>
                <NavigationMenuLink>Link</NavigationMenuLink>
                <NavigationMenuLink>Link</NavigationMenuLink>
                <NavigationMenuLink>Link</NavigationMenuLink>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className='max-md:my-6'>
          <a href="#" className="hover:underline">CONTACT</a>
        </div>
        <div>
          <a href="#" className="hover:underline">ABOUT US</a>
        </div>
        <div className='max-sm:mt-3 max-sm:mr-5 cursor-pointer' onClick={() => setSearchVisible(!searchVisible)}>
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
      <div className=" my-4">
     
       
        <Button className=" max-md:w-[200px]"><Link to="/Auth/login">LOGIN </Link></Button>
      </div>
    </section>
  );
}

export default Header;