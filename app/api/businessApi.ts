export const getBusinessPostById = async (id: string, token?: string) => {
  const res = await axios.get(`${API_URL}/post/${id}`,
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
  );
  return res.data.post;
};
import axios from "axios";

const API_URL = "https://localhost:300/api/business";

export interface BusinessPost {
  _id: string;
  url: string;
  type: string;
  publicId: string;
  description: string;
  location: { lat: number; long: number };
  name: string;
  category: string;
  promo: string;
  tickets: number;
  pinned?: boolean;
  pinExpiry?: string;
  bookings?: any[];
  Privy_Id: string;
}

export interface PrivyUser {
  id: string;
  accessToken?: string;
}

export const getBusinessPosts = async (token?: string) => {
  const res = await axios.get(`${API_URL}/my-posts`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.posts || [];
};

export const createBusinessPost = async (form: Partial<BusinessPost>, token?: string, privyId?: string) => {
  const res = await axios.post(`${API_URL}/post`, form, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(privyId ? { 'x-privy-id': privyId } : {})
    }
  });
  return res.data;
};

export const editBusinessPost = async (id: string, updates: Partial<BusinessPost>, token?: string) => {
  console.log('[editBusinessPost] PUT', `${API_URL}/post/${id}`);
  console.log('[editBusinessPost] Updates:', updates);
  console.log('[editBusinessPost] Token:', token);
  try {
    const res = await axios.put(`${API_URL}/post/${id}`, updates, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    console.log('[editBusinessPost] Response:', res.data);
    return res.data;
  } catch (err) {
    console.error('[editBusinessPost] Error:', err);
    throw err;
  }
};

export const deleteBusinessPost = async (id: string, token?: string) => {
  const res = await axios.delete(`${API_URL}/post/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const pinBusinessLocation = async (id: string, token?: string) => {
  const res = await axios.post(`${API_URL}/post/${id}/pin`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const reportBusinessPost = async (id: string, reason: string, token?: string) => {
  const res = await axios.post(`${API_URL}/post/${id}/report`, { reason }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
