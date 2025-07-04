import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';

import './App.css';
import EditorPage from './pages/EditorPage';
import EditorNew from './pages/EditorNew';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="editor/:secretOne/:secretTwo" element={<EditorPage />} />
          <Route path="editor/new/:secretOne/:secretTwo" element={<EditorNew />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;