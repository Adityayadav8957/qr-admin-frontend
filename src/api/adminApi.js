import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const adminLogin = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const getAdminProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Dashboard
export const getDashboardStats = async () => {
  const response = await api.get('/admin/dashboard/stats');
  return response.data;
};

// Users
export const getUsers = async (params) => {
  const response = await api.get('/admin/users', { params });
  return response.data;
};

export const getUserDetails = async (id) => {
  const response = await api.get(`/admin/users/${id}`);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await api.put(`/admin/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

// QR Codes
export const getQRCodes = async (params) => {
  const response = await api.get('/admin/qr-codes', { params });
  return response.data;
};

export const getQRCodeDetails = async (id) => {
  const response = await api.get(`/admin/qr-codes/${id}`);
  return response.data;
};

export const updateQRCode = async (id, data) => {
  const response = await api.put(`/admin/qr-codes/${id}`, data);
  return response.data;
};

export const deleteQRCode = async (id) => {
  const response = await api.delete(`/admin/qr-codes/${id}`);
  return response.data;
};

// Landing Pages
export const getLandingPages = async (params) => {
  const response = await api.get('/admin/landing-pages', { params });
  return response.data;
};

export const getLandingPageDetails = async (id) => {
  const response = await api.get(`/admin/landing-pages/${id}`);
  return response.data;
};

export const updateLandingPage = async (id, data) => {
  const response = await api.put(`/admin/landing-pages/${id}`, data);
  return response.data;
};

export const deleteLandingPage = async (id) => {
  const response = await api.delete(`/admin/landing-pages/${id}`);
  return response.data;
};

// Analytics
export const getSystemAnalytics = async (params) => {
  const response = await api.get('/admin/analytics', { params });
  return response.data;
};

export default api;