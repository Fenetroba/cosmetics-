import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '@/redux/features/userSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '@all-users/Header';
import { toast } from "sonner";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, isLoading, error } = useSelector((state) => state.user);
  const { isAuthenticated, user, isLoading: authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only fetch profile if authenticated and no profile data exists
    if (isAuthenticated && !profile && !isLoading) {
      dispatch(fetchUserProfile())
        .unwrap()
        .then((data) => {
          console.log('Profile fetched successfully:', data);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
          toast.error(error.message || "Failed to load profile data");
        });
    }
  }, [dispatch, isAuthenticated, profile, isLoading]);

  // Show loading state while checking auth or loading profile
  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Check authentication
  if (!isAuthenticated || !user) {
    console.log('Not authenticated:', { isAuthenticated, user });
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please login to view your profile</p>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Check for profile data
  if (!profile) {
    console.log('No profile data available');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No profile data available</p>
          <Button asChild>
            <Link to="/login">Return to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Check if profile.user exists (backend might be sending data nested under user property)
  const userData = profile.data || profile;
  console.log('Rendering profile with data:', userData);

  return (
    <section>

      
      <div className="container mx-auto h-full p-4 md:p-10 m-4 md:m-10 rounded-2xl">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-20 w-20 bg-green-400">
                <AvatarImage src={userData.avatar} alt={userData.username} />
                <AvatarFallback>{userData.username?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{userData.username}</CardTitle>
                <CardDescription className="text-lg">{userData.email}</CardDescription>
                <Badge variant="secondary" className="mt-2">
                  {userData.role}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Profile Details */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="mt-1">{userData.fullName || 'Not provided'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                  <p className="mt-1">{userData.phone || 'Not provided'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="mt-1">{userData.location || 'Not provided'}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                  <p className="mt-1">{new Date(userData.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                  <p className="mt-1">{new Date(userData.updatedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Account Status</h3>
                  <p className="mt-1">
                    <Badge variant={userData.isActive ? "success" : "destructive"}>
                      {userData.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            {userData.role === 'admin' ? (
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link to="/admin/settings">Edit Profile</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/admin/home">Back To Home</Link>
                </Button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link to="/shop/settings">Edit Profile</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/shop/orders">View Orders</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;