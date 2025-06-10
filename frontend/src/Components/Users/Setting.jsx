import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../../redux/features/userSlice';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { toast } from "sonner";
import Header from '../../all users/Header';

const Setting = () => {
  const dispatch = useDispatch();
  const { profile, isLoading, error, success } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        email: profile.email || '',
        phone: profile.phone || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      toast.success("Profile updated successfully!", {
        description: "Your changes have been saved.",
        duration: 3000,
      });
    } catch (error) {
      toast.error("Failed to update profile", {
        description: error.message || "Please try again later.",
        duration: 3000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <section>
     
    <div className="container mx-auto shadow-2xl h-full p-10 m-10 rounded-2xl">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Update your account information and preferences
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between mt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  username: profile?.username || '',
                  email: profile?.email || '',
                  phone: profile?.phone || ''
                });
                toast.info("Form reset", {
                  description: "All changes have been discarded.",
                  duration: 2000,
                });
              }}
            >
              Reset
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Additional Settings Sections */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => toast.info("Coming soon", {
                description: "Password change functionality will be available soon.",
                duration: 2000,
              })}
            >
              Change Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="email-notifications"
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    toast.success(
                      e.target.checked ? "Email notifications enabled" : "Email notifications disabled",
                      { duration: 2000 }
                    );
                  }}
                />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sms-notifications"
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    toast.success(
                      e.target.checked ? "SMS notifications enabled" : "SMS notifications disabled",
                      { duration: 2000 }
                    );
                  }}
                />
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </section>
  );
};

export default Setting;