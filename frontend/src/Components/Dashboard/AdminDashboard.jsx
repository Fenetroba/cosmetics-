import { Routes, Route } from 'react-router-dom';
import Addproducts from '../Admin/AddProduct';
import LeftSider from '../Admin/LeftSider';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import ProfilePage from '../Admin/ProfilePage';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <div className="flex-none">
          <LeftSider />
        </div>
        <div className="flex-1 p-6">
          <div className="mb-4">
            <SidebarTrigger />
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex justify-between">
            <Addproducts />
            <ProfilePage/>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard; 