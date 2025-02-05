import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import { PostProvider } from './context/PostContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <PostProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </Router>
    </PostProvider>
  );
}

export default App;
