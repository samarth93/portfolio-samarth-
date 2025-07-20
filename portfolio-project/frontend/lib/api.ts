// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:8081/api',
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

// Helper function to create authorized headers
export const createAuthHeaders = (token: string) => ({
  ...API_CONFIG.HEADERS,
  'Authorization': `Bearer ${token}`,
});

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_CONFIG.BASE_URL}/auth/login`,
  LOGOUT: `${API_CONFIG.BASE_URL}/auth/logout`,
  VALIDATE: `${API_CONFIG.BASE_URL}/auth/validate`,
  
  // Experiences
  EXPERIENCES: `${API_CONFIG.BASE_URL}/experiences`,
  
  // Projects
  PROJECTS: `${API_CONFIG.BASE_URL}/projects`,
  
  // Insights
  INSIGHTS: `${API_CONFIG.BASE_URL}/insights`,
  INSIGHTS_ALL: `${API_CONFIG.BASE_URL}/insights/all`,
  
  // Contacts (using auth endpoints as workaround)
  CONTACTS: `${API_CONFIG.BASE_URL}/auth/contacts`,
  CONTACTS_UNREAD: `${API_CONFIG.BASE_URL}/auth/contacts/unread`,
  CONTACTS_STATS: `${API_CONFIG.BASE_URL}/auth/contacts/stats`,
  CONTACTS_SEARCH: `${API_CONFIG.BASE_URL}/auth/contacts/search`,
}; 