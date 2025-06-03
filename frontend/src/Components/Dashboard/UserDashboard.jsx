import Header from '@/all users/Header';
import Home from '@/Page/user/Home';
import Profile from '@/Page/user/profile';
import Setting from '@/Page/user/Setting';
import { Routes, Route } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Header/>
     <Setting/>
     <Profile/>
    </div>
  );
};

export default UserDashboard; 