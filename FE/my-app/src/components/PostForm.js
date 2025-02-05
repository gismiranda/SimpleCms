import React, { useState, useEffect } from 'react';
import { TextField, Button, Container } from '@mui/material';
import ErrorMessage from './ErrorMessage';

const PostForm = ({ initialData, onSubmit, buttonText }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [tags, setTags] = useState(initialData?.tags || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setTags(initialData.tags);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({ title, content, tags, user_id:1 });
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        <TextField
          label="Tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <ErrorMessage message={error} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {buttonText}
        </Button>
      </form>
    </Container>
  );
};

export default PostForm;