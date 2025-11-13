// src/services/requestService.js
import api from './api';

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getRequests = async (token) => {
  const res = await api.get('/api/requests', authHeader(token));
  return res.data;
};

export const addRequest = async (token, data) => {
  const res = await api.post('/api/requests', data, authHeader(token));
  return res.data;
};

export const getAllRequests = async (token) => {
  const res = await api.get('/api/requests/all', authHeader(token));
  return res.data;
};

export const updateRequestStatus = async (token, id, status) => {
  const res = await api.put(`/api/requests/${id}`, { status }, authHeader(token));
  return res.data;
};

// 🔹 New: edit full request (type, description, branch/device)
export const editRequest = async (token, id, data) => {
  const res = await api.put(`/api/requests/${id}/edit`, data, authHeader(token));
  return res.data;
};

// 🔹 New: delete request
export const deleteRequest = async (token, id) => {
  const res = await api.delete(`/api/requests/${id}`, authHeader(token));
  return res.data;
};

export default {
  getRequests,
  addRequest,
  getAllRequests,
  updateRequestStatus,
  editRequest,
  deleteRequest,
};
