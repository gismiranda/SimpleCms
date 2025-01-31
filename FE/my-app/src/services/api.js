import axios from 'axios'
import API_URLS from '../apiConfig'

export const login = (email, password) => axios.post(`${API_URLS.USERS}/login`)
export const logout = () => axios.post(`${API_URLS.USERS}/logout`)
export const getPost = () => axios.get(`${API_URLS.POSTS}/latest`)
export const createPost = (post) => axios.post(API_URLS.POSTS,post)
export const updatePost = (id, post) => axios.put(`${API_URLS.POSTS}/${id}`,post)
export const deletePost = (id) => axios.delete(`${API_URLS.POSTS}/${id}`)
export const detailPost = (id) => axios.get(`${API_URLS.POSTS}/${id}`)