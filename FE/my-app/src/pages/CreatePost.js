import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Divider, Card, CardContent } from '@mui/material';
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
        <Container component="main" maxWidth="sm">
            <Metadata {...metadataConfig.createPost} />
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Create Post
                    </Typography>
                    <Divider />
                    <PostForm onSubmit={handleSubmit} buttonText="Create Post" />
                </CardContent>
            </Card>
        </Container>
    );
};

export default CreatePost;