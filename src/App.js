// admin/src/App.js
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products/Products';
import Enquiries from './components/Enquiries/Enquiries';
import Orders from './components/Orders/Orders';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';
import { ToastContainer } from './components/Toast/Toast';
import { getAnalytics } from './services/api';
import './styles/global.css';
import './styles/components.css';
import './components/Login/Login.css';

function AdminApp() {
  const { admin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [badges, setBadges] = useState({});

  // Poll pending enquiry count for sidebar badge
  useEffect(() => {
    if (!admin) return;
    const load = () => {
      getAnalytics()
        .then(r => setBadges({ pendingEnquiries: r.data?.pendingEnquiries || 0 }))
        .catch(() => {});
    };
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [admin]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F0F1A' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!admin) return <Login />;

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':  return <Dashboard setActive={setActiveTab} />;
      case 'products':   return <Products />;
      case 'enquiries':  return <Enquiries />;
      case 'orders':     return <Orders />;
      case 'analytics':  return <Analytics />;
      case 'settings':   return <Settings />;
      default:           return <Dashboard setActive={setActiveTab} />;
    }
  };

  return (
    <div className="admin-shell">
      <Sidebar active={activeTab} setActive={setActiveTab} badges={badges} />
      <main className="admin-main">{renderPage()}</main>
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AdminApp />
    </AuthProvider>
  );
}
