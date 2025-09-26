'use client'

import React, { useState, useEffect } from 'react';
import AdminLogin from '../../components/AdminLogin';
import AdminPanel from '../../components/AdminPanel';

const AdminPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there's a stored token
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      // Validate the token with the backend
      validateToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (tokenToValidate: string) => {
    try {
      const response = await fetch('/api/auth/validate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenToValidate}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setToken(tokenToValidate);
        } else {
          localStorage.removeItem('adminToken');
        }
      } else {
        localStorage.removeItem('adminToken');
        setToken(null);
      }
    } catch (err) {
      console.error('Token validation error:', err);
      localStorage.removeItem('adminToken');
      // Force logout on any token validation error
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('adminToken', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div>
      {token ? (
        <AdminPanel token={token} onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default AdminPage; 