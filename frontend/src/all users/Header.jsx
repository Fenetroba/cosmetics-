import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { BaggageClaim, Search, User } from 'lucide-react'
const Header = () => {
  return (
<section className='flex items-center justify-between p-6'>
  <div >Logo</div>
  <nav className='flex items-center space-x-3.5'>
  <div><a href="#">HOME</a></div>

  <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>BATH & BODY</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>HAIR CARE</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>SKIN CARE</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
<div><a href="#">CONTACT</a></div>
<div><a href="#">ABOUT US</a></div>
<Search className='ml-6'/>
  </nav>
  <div className='flex items-center space-x-10'>
    

   <User/>
   <BaggageClaim/>

  </div>
</section>
  )
}

export default Header