import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1200);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on navigation (mobile/tablet only)
  useEffect(() => {
    if (window.innerWidth < 1200) {
      setSidebarOpen(false);
    }
  }, [location]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`app ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="app-wrapper">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <Outlet />
          </div>
        </div>
        <footer className="app-footer">
          <div className="container text-center py-3">
            <small className="copyright">© 2026 <a className="app-link" href="#">Capernaum Solutions Pvt. Ltd.</a> | All Rights Reserved | Powered by <a className="app-link" href="https://www.technokraftservices.com/" target="_blank" rel="noopener noreferrer">TechnoKraft Services LLP.</a></small>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
