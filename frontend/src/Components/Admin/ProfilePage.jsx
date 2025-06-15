import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../Components/ui/dropdown-menu";
import { UserPen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/features/authSlice";
const ProfilePage = () => {
  const dispatch = useDispatch();

  const LogoutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className='hover:bg-[var(--three)] cursor-pointer p-1 rounded-full'>
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
          <DropdownMenuItem>
            <Button className="cursor-pointer">
              {" "}
              <span onClick={LogoutHandler}>LOGOUT</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfilePage;
