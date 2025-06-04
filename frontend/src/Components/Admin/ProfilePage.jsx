import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPen } from 'lucide-react';
import { Link } from 'react-router-dom';
const ProfilePage = () => {
  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger>
              <UserPen className=" cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/admin/Profile">Profile</Link>{" "}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/admin/settings">Setting</Link>{" "}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
    </div>
  )
}

export default ProfilePage