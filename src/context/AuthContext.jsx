import { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin, getAdminProfile } from '../api/adminApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        const response = await getAdminProfile();
        if (response.success && response.data.user.role === 'admin') {
          setUser(response.data.user);
        } else {
          localStorage.removeItem('adminToken');
        }
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('adminToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await adminLogin(email, password);
      
      if (response.success && response.data.user.role === 'admin') {
        localStorage.setItem('adminToken', response.data.token);
        setUser(response.data.user);
        return { success: true };
      } else {
        throw new Error('Access denied. Admin privileges required.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};