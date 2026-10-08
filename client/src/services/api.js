import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (name, email, password) =>
    apiClient.post('/auth/register', { name, email, password }),
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
};

export const expenseService = {
  addExpense: (amount, category, description, date) =>
    apiClient.post('/expenses', { amount, category, description, date }),
  getExpenses: (category, startDate, endDate) =>
    apiClient.get('/expenses', { params: { category, startDate, endDate } }),
  updateExpense: (id, amount, category, description, date) =>
    apiClient.put(`/expenses/${id}`, { amount, category, description, date }),
  deleteExpense: (id) =>
    apiClient.delete(`/expenses/${id}`),
  getStats: () =>
    apiClient.get('/expenses/stats'),
};

export default apiClient;
