import { Routes, Route } from 'react-router-dom';
import Addproducts from '../Admin/AddProduct';
import LeftSider from '../Admin/LeftSider';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import ProfilePage from '../Admin/ProfilePage';
import AdminDashboardImg from '../../assets/some.jpg'
const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <div className="flex-none">
          <LeftSider />
        </div>
        <div className="flex-1 p-6">
          <div className="mb-4 ">
            <SidebarTrigger  className='hover:bg-[var(--three)] cursor-pointer'/>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex justify-between">
            <Addproducts />
            <ProfilePage/>
          </div>
          <div className="reletive left-2/10 top-0 w-full  mt-20">
        <img src={AdminDashboardImg} alt="AdminDashboard" className="w-full h-[300px]"/>
        </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard; 