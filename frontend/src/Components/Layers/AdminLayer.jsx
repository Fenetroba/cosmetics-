import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowBigLeftIcon  } from "lucide-react";

const AdminLayer = () => {
  return (
    <div className="sm:m-8 rounded-tr-[14%] shadow-2xl">
      <div>
        <Button className="cursor-pointer gap-1.5 hover:bg-amber-950 ls mt-4 ml-4">
  
          <Link to="/admin/home" className="flex"><ArrowBigLeftIcon/><span> Back To Home</span></Link>
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayer;
