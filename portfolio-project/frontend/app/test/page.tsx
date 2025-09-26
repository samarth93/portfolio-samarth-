import React from 'react';

export default function TestPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Test Page Working</h1>
      <p>If you can see this, the routing is working correctly.</p>
      <div>
        <a href="/">← Back to Home</a> | 
        <a href="/community">Community</a> | 
        <a href="/insights">Insights</a> | 
        <a href="/admin">Admin</a>
      </div>
    </div>
  );
}