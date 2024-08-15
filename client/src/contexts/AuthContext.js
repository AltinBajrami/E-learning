import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/api/v1/users/current-user',
        {
          withCredentials: true,
        }
      );
      if (response.data && response.data.user) {
        setCurrentUser(response.data.user);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/auth/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const data = response.data;
      if (data && data.user) {
        setCurrentUser(data.user);
        toast.success('Logged in successfully');
        return true;
      } else {
        toast.error('Failed to login');
        return false;
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.get('http://localhost:4000/api/v1/auth/logout', {
        withCredentials: true,
      });
      setCurrentUser(null);
      toast.success('Logout successfully');
    } catch (error) {
      toast.error('Failed to logout, try again later');
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    isUserLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
