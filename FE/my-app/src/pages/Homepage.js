import React, { useContext, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Metadata from '../components/Metadata';
import PostContext from '../context/PostContext';
import metadataConfig from '../metadataConfig';
 
const Homepage = () => {
    const { state, fetchPosts } = useContext(PostContext);
 
    const stableFetchPosts = useCallback(fetchPosts, []);
 
    useEffect(() => {
        stableFetchPosts();
    }, [stableFetchPosts]);
 
    return (
        <div>
            <Metadata {...metadataConfig.homepage} />
            <h1>Recent Posts</h1>
            <ul>
                {state.posts.slice(0, 10).map(post => (
                <li key={post.id}>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                </li>
                ))}
            </ul>
        </div>
    );
};
 
export default Homepage;