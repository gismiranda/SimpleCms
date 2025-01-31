import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import SecureRoute from './components/SecureRoute';
import { PostProvider } from './context/PostContext';


function App() {
  return (
    <PostProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit:id" element={<SecureRoute><EditPost /></SecureRoute>} />
          <Route path="/post:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </PostProvider>
  );
}

export default App;
