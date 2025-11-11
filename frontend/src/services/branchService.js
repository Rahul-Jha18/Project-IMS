// src/services/branchService.js
import api from './api';

/**
 * Fetch all branches
 * @param {string} token - JWT token
 * @returns {Promise<Array>} - List of branches
 */
export const getBranches = async (token) => {
  const res = await api.get('/api/branches', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

/**
 * Add a new branch (admin only)
 * @param {string} token - JWT token
 * @param {Object} branchData - Branch info { name }
 * @returns {Promise<Object>} - Created branch
 */
export const addBranch = async (token, branchData) => {
  const res = await api.post('/api/branches', branchData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};