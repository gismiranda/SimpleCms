import React, {createContext, useReducer} from 'react'
import { getPost, updatePost, deletePost, createPost, getPosts, register, login, logout } from '../services/api';

const PostContext = createContext();

const initialState = {
    posts: [],
    initialLoading: true,
};

const postReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return { ...state, posts: action.payload };
        case 'DETAIL_POSTS':
                return { ...state, posts: action.payload };
        case 'ADD_POST':
            return { ...state, posts: [...state.posts, action.payload] };
        case 'UPDATE_POST':
            return { ...state, posts: state.posts.map(post => post.id === action.payload.id ? action.payload : post)};
        case 'DELETE_POST':
            return { ...state, posts: state.posts.filter(post => post.id !== action.payload)};
        case 'REGISTER_USER':
            return { ...state, posts: [...state.posts, action.payload] };
        case 'LOGIN_USER':
            return { ...state, posts: [...state.posts, action.payload] };
        case 'LOGOUT_USER':
            return { ...state, posts: action.payload };
        case 'RESET_INITIAL_LOADING':
            return { ...state, initialLoading: true };
        default:
            return state;
    }
}

export const PostProvider = ({ children }) => {
    //const [state, dispatch] = useReducer(postReducer, {posts:[]});
    const [state, dispatch] = useReducer(postReducer, initialState);

    const fetchPosts = async () => {
        const response = await getPosts();
        dispatch({ type: 'SET_POSTS', payload: response.data });
    };

    const detailPost = async (id) => {
        const response = await getPost(id);
        dispatch({ type: 'DETAIL_POSTS', payload: response.data });
    };

    const addPost = async (post) => {
        const response = await createPost(post);
        dispatch({ type: 'ADD_POST', payload: response.data });
    };

    const editPost = async (id, post) => {
        const response = await updatePost(id, post);
        dispatch({ type: 'UPDATE_POST', payload: response.data });
    };

    const removePost = async (id, post) => {
        const response = await deletePost(id, post);
        dispatch({ type: 'DELETE_POST', payload: response.data });
    };

    const registerUser = async (name, email, password) => {
        const response = await register(name, email, password);
        dispatch({ type: 'REGISTER_USER', payload: response.data });
    };

    const loginUser = async (email, password) => {
        const response = await login(email, password);
        if (response && response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            dispatch({ type: 'LOGIN_USER', payload: response.data });
        } else {
            throw new Error('Invalid response from server');
        }
    };

    const logoutUser = async () => {
        const token = localStorage.getItem('token');
        const response = await logout(token);
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT_USER' });
    };

    const resetInitialLoading = () => {
        dispatch({ type: 'RESET_INITIAL_LOADING' });
    };

    return (
        <PostContext.Provider value={{state, fetchPosts, addPost, editPost, removePost, detailPost, registerUser, loginUser, logoutUser, resetInitialLoading}}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContext;