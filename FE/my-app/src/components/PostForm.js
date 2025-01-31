import React, { useState, useEffect } from 'react';
import Input from './Input';
import Textarea from './Textarea';
import Button from './Button';
import ErrorMessage from './ErrorMessage';

const PostForm = ({ initialData, onSubmit, buttonText }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [tags, setTags] = useState(initialData?.tags?.join(',') || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setTags(initialData.tags.join(','));
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({ title, content, tags: tags.split(',') });
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Title:" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Textarea label="Content:" value={content} onChange={(e) => setContent(e.target.value)} required />
      <Input label="Tags:" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
      <ErrorMessage message={error} />
      <Button type="submit">{buttonText}</Button>
    </form>
  );
};

export default PostForm;