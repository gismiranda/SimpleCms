import axios from 'axios'
import API_URLS from '../apiConfig'

export const getPosts = () => axios.get(`${API_URLS.POSTS}/latest`)
export const createPost = (post) => axios.post(API_URLS.POSTS,post)
export const updatePost = (id, post) => axios.put(`${API_URLS.POSTS}/${id}`,post)
export const deletePost = (id) => axios.delete(`${API_URLS.POSTS}/${id}`)
export const getPost = (id) => axios.get(`${API_URLS.POSTS}/${id}`)
export const register = (name, email, password) => {
    return axios.post(`${API_URLS.USERS}/register`, {
      name,
      email,
      password
    });
  };
export const login = async (email, password) => {
  try {
      const response = await axios.post(`${API_URLS.USERS}/login`, {
          email,
          password
      }); 
      return response;
  } catch (error) {
      throw new Error('Failed to login');
  }
};
  
export const logout = async () => {
  try {
      const response = await axios.post(`${API_URLS.USERS}/logout`);
      console.log('Logout Response:', response);
      return response;
  } catch (error) {
      throw new Error('Failed to logout');
  }
};
  