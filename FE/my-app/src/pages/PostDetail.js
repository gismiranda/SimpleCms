import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Card, CardContent, Divider, TextareaAutosize, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import PostContext from '../context/PostContext';
import Metadata from '../components/Metadata';
import metadataConfig from '../metadataConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrorMessage from '../components/ErrorMessage';

const PostDetail = () => {
  const { id } = useParams();
  const { state, detailPost, removePost } = useContext(PostContext);
  const [open, setOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const post = state.posts.find(p => p.id === parseInt(id));
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!post) {
      detailPost(id);
    }
  }, [post, id, detailPost]);

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const handleDeleteClick = (id) => {
    setSelectedPostId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPostId(null);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await removePost(selectedPostId);
      handleClose();
      navigate(`/`);
    } catch (err) {
      setError('Failed to delete post.');
    } finally {
      setLoading(false);
    }
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Container component="main" maxWidth="md">
      <Metadata {...metadataConfig.postDetail(post)} />
      <ErrorMessage message={error} />
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
              {post.title}
            </Typography>
            <Box>
              <Button onClick={() => handleEdit(post.id)}>
                <EditIcon />
              </Button>
              <Button onClick={() => handleDeleteClick(post.id)}>
                <DeleteIcon sx={{ color: 'red' }} />
              </Button>
            </Box>
          </Box>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h6" component="h3" gutterBottom style={{ fontWeight: 'bold' }}>
            Content
          </Typography>
          <TextareaAutosize
            minRows={3}
            style={{ width: '100%', resize: 'none' }}
            value={post.content}
            readOnly
          />
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h6" component="h3" gutterBottom style={{ fontWeight: 'bold' }}>
            Tags
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            {post.tags}
          </Typography>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the post?
          </DialogContentText>
          {loading && <CircularProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" disabled={loading}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PostDetail;