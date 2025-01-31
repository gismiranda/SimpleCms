import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PostContext from '../context/PostContext';
import PostForm from '../components/PostForm';
import Metadata from '../components/Metadata';
import metadataConfig from '../metadataConfig';

const CreatePost = () => {
    const { addPost } = useContext(PostContext);
    const navigate = useNavigate();

    const handleSubmit = async (post) => {
        await addPost(post);
        navigate('/');
    };

    return (
        <div>
            <Metadata {...metadataConfig.createPost} />
            <h2>Create Post</h2>
            <PostForm onSubmit={handleSubmit} buttonText="Create Post" />
        </div>
    );
};

export default CreatePost;