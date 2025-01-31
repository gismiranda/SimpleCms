import React, { useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PostContext from '../context/PostContext';
import Metadata from '../components/Metadata';
import Button from '../components/Button';
import metadataConfig from '../metadataConfig';

const PostDetail = () => {
  const { id } = useParams();
  const { state, fetchPost, detailPosts } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost(id);
  }, [id, fetchPost]);

  const post = state.posts.find(p => p.id === parseInt(id));

  const handleDelete = async () => {
    await detailPosts(id);
    navigate('/');
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <Metadata {...metadataConfig.postDetail(post)} />
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Tags: {post.tags.join(', ')}</p>
      <Link to={`/edit/${post.id}`}>Edit</Link>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};

export default PostDetail;