// admin/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('vvm_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('vvm_admin_token');
      localStorage.removeItem('vvm_admin_user');
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

export const login = (credentials) => API.post('/auth/login', credentials).then(r => r.data);
export const getMe = () => API.get('/auth/me').then(r => r.data);

export const getProducts = (params) => API.get('/products', { params }).then(r => r.data);
export const createProduct = (data) => API.post('/products', data).then(r => r.data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data).then(r => r.data);
export const deleteProduct = (id) => API.delete(`/products/${id}`).then(r => r.data);

export const getEnquiries = (params) => API.get('/enquiries', { params }).then(r => r.data);
export const updateEnquiryStatus = (id, status) => API.patch(`/enquiries/${id}/status`, { status }).then(r => r.data);
export const deleteEnquiry = (id) => API.delete(`/enquiries/${id}`).then(r => r.data);

export const getOrders = (params) => API.get('/orders', { params }).then(r => r.data);
export const createOrder = (data) => API.post('/orders', data).then(r => r.data);
export const updateOrderStatus = (id, status) => API.patch(`/orders/${id}/status`, { status }).then(r => r.data);

export const getAnalytics = () => API.get('/analytics/summary').then(r => r.data);

export default API;
