import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Divider } from '@mui/material';
import PostContext from '../context/PostContext';
import PostForm from '../components/PostForm';
import Metadata from '../components/Metadata';
import metadataConfig from '../metadataConfig';

const EditPost = () => {
  const { id } = useParams();
  const { state, editPost } = useContext(PostContext);
  const navigate = useNavigate();
  const post = state.posts.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (!post) {
      navigate('/');
    }
  }, [post, navigate]);

  const handleSubmit = async (updatePost) => {
    await editPost(id, updatePost);
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Metadata {...metadataConfig.editPost} />
      <Card>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            Edit Post
          </Typography>
          <Divider />
          {post && <PostForm initialData={post} onSubmit={handleSubmit} buttonText="Update Post" />}
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditPost;
