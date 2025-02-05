import React, { useContext, useEffect, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, CardActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Metadata from '../components/Metadata';
import Authentication from '../components/Authentication';
import PostContext from '../context/PostContext';
import metadataConfig from '../metadataConfig';
import ErrorMessage from '../components/ErrorMessage';
import { StyledCard, CardContentStyled, CardTitle, Tags, Header, DeleteButton, EditButton } from '../styles/styledComponents';

const Homepage = () => {
    const { state, fetchPosts, removePost, resetInitialLoading } = useContext(PostContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState('');

    const stableFetchPosts = useCallback(fetchPosts, []);

    useEffect(() => {
        const fetchData = async () => {
            //setInitialLoading(true);
            resetInitialLoading();
            try {
                await stableFetchPosts();
            } catch (err) {
                setError('Failed to fetch posts.');
            } finally {
                setInitialLoading(false);
            }
        };
        fetchData();
    }, [stableFetchPosts, resetInitialLoading]);

    const handleEdit = (postId) => {
        navigate(`/edit/${postId}`);
    };

    const handleCreateClick = () => {
        navigate('/create');
    };

    const handleRegisterClick = () => {
        navigate('/register');
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
            stableFetchPosts();
            handleClose();
        } catch (err) {
            setError('Failed to delete post.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Metadata {...metadataConfig.homepage} />
            <Header>
                <Typography variant="h4" component="h1" gutterBottom>
                    Recent Posts
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddIcon />}
                    onClick={handleCreateClick}
                >
                    Create
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddIcon />}
                    onClick={handleRegisterClick}
                >
                    Register
                </Button>
                <Authentication />
            </Header>
            <ErrorMessage message={error} />
            {initialLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            ) : (
                state.posts.slice(0, 10).map(post => {
                    return (
                        <StyledCard key={post.id}>
                            <EditButton onClick={() => handleEdit(post.id)}>
                                <EditIcon />
                            </EditButton>
                            <DeleteButton onClick={() => handleDeleteClick(post.id)}>
                                <DeleteIcon />
                            </DeleteButton>
                            <CardContentStyled>
                                <CardTitle variant="h5" component="h2">
                                    {post.title}
                                </CardTitle>
                                <Divider />
                                <Typography variant="body2" color="textSecondary">
                                    {post.content}
                                </Typography>
                                <Tags variant="body2">
                                    {post.tags}
                                </Tags>
                            </CardContentStyled>
                            <CardActions>
                                <Button size="small" color="primary" component={Link} to={`/post/${post.id}`}>
                                    Read More
                                </Button>
                            </CardActions>
                        </StyledCard>
                    );
                })
            )}
            <Dialog
                open={open}
                onClose={handleClose}
            >
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

export default Homepage;