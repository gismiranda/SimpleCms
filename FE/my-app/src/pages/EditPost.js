import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    <div>
      <Metadata {...metadataConfig.editPost} />
      <h2>Edit Post</h2>
      {post && <PostForm initialData={post} onSubmit={handleSubmit} buttonText="Update Post" />}
    </div>
  );
};

export default EditPost;
