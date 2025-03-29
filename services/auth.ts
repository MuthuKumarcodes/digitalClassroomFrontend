// auth.ts

import api from './api';
import * as SecureStore from 'expo-secure-store';

export const login = async (username: string, password: string) => {
  const response = await api.post('/login', { username, password });
  
  if (response.data.token) {
    await SecureStore.setItemAsync('userToken', response.data.token);
    await SecureStore.setItemAsync('userData', JSON.stringify(response.data.user));
    return response.data;
  }
  throw new Error('No token received');
};

export const logout = async () => {
  await SecureStore.deleteItemAsync('userToken');
  await SecureStore.deleteItemAsync('userData');
};

export const getCurrentUser = async () => {
  const userData = await SecureStore.getItemAsync('userData');
  return userData ? JSON.parse(userData) : null;
};

export const getToken = async () => {
  return await SecureStore.getItemAsync('userToken');
};

export const verifyToken = async () => {
  const token = await getToken();
  
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await api.get('/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // If verification fails, clear storage
    await logout();
    throw error;
  }
};