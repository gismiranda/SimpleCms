import React, {createContext, useReducer} from 'react'
import { getPost, updatePost, deletePost, createPost, detailPost } from '../services/api';

const PostContext = createContext();

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
        default:
            return state;
    }
}

export const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, {posts:[]});

    const fetchPosts = async () => {
        const response = await getPost();
        dispatch({ type: 'SET_POSTS', payload: response.data });
    };

    const detailPost = async (id) => {
        const response = await detailPost(id);
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

    return (
        <PostContext.Provider value={{state, fetchPosts, addPost, editPost, removePost, detailPost}}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContext;