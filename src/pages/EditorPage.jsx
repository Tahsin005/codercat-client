import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBlogsQuery, useDeleteBlogMutation } from '../api/apiSlice';
import { FiEdit3, FiTrash2, FiEye, FiPlus, FiSearch, FiDelete } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const EditorPage = () => {
    const { secretOne, secretTwo } = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewedPost, setViewedPost] = useState(null);
    const contentRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const secretValueFromEnvOne = import.meta.env.VITE_EDITOR_SECRET_ONE;
    const secretValueFromEnvTwo = import.meta.env.VITE_EDITOR_SECRET_TWO;
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    useEffect(() => {
        if (secretOne !== secretValueFromEnvOne || secretTwo !== secretValueFromEnvTwo) {
            navigate('/');
        }
    }, [secretOne, secretTwo, secretValueFromEnvOne, secretValueFromEnvTwo, navigate]);

    const { data: posts, isLoading, isError, refetch } = useGetBlogsQuery();
    const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

    useEffect(() => {
        if (viewedPost && contentRef.current) {
            const el = contentRef.current;
            setIsOverflowing(el.scrollHeight > el.clientHeight);
        } else {
            setIsOverflowing(false);
        }
    }, [viewedPost]);

    const handleDelete = async (id) => {
        try {
            await deleteBlog(id).unwrap();
            refetch();
            toast.success('Blog deleted successfully');
        } catch (error) {
            toast.error('Failed to delete blog');
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-950 min-h-screen">
                <div className="bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 pt-16 pb-10">
                    <div className="container-custom">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
                <div className="container-custom py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl h-96"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-white dark:bg-gray-950 min-h-screen">
                <div className="bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 pt-16 pb-10">
                    <div className="container-custom text-center">
                        <p className="text-red-600 dark:text-red-400 text-xl md:text-2xl font-semibold">
                            ⚠️ Failed to load blogs. Please try again later.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const filteredPosts = posts?.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    }) || [];

    const categories = ['all', ...new Set(posts?.map(post => post.category) || [])];

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen">
            <div className="bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 pt-16 pb-10">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div className="text-start">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
                                <span className="text-primary-600 dark:text-primary-400">Editor</span> Dashboard
                            </h1>
                            <p className="text-lg text-gray-700 dark:text-gray-300 animate-slide-up">
                                Manage and edit coding tutorials with feline precision
                            </p>
                        </div>
                        <Link
                            to={`/editor/new/${secretOne}/${secretTwo}`}
                            className="btn-primary inline-flex items-center self-start"
                        >
                            <FiPlus className="h-5 w-5 mr-2" />
                            Create New Post
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="container-custom py-12">
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => (
                            <div key={post.id} className="relative bg-primary-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg group">
                                <div className="relative overflow-hidden aspect-video">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 bg-primary-600 text-white text-sm font-bold px-3 py-1.5 rounded-md">
                                        {post.category}
                                    </div>
                                    <button
                                        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white shadow-lg border border-red-700 rounded-full p-2 text-2xl font-bold focus:outline-none z-20"
                                        onClick={() => setDeleteConfirmId(post.id)}
                                        title="Delete blog post"
                                    >
                                        <FiDelete className="h-5 w-5 mx-auto" />
                                    </button>
                                </div>

                                <div className="p-6 flex flex-col justify-around">
                                    <div className="flex items-center space-x-3 text-sm text-primary-400 font-sans mb-4">
                                        <time dateTime={post.date}>
                                            {format(new Date(post.date), 'MMM d, yyyy')}
                                        </time>
                                        <span className="text-secondary-400">•</span>
                                        <span>{post.readTime} read</span>
                                    </div>

                                    <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400  mb-4 font-sans text-start">
                                        {post.title}
                                    </h2>

                                    <div className="flex justify-evenly space-x-3">
                                        <button className="flex-1 px-4 py-2 bg-primary-600  text-white rounded-md hover:shadow-lg flex items-center justify-center">
                                            <FiEdit3 className="h-5 w-5 mx-auto" />
                                        </button>
                                        <button
                                            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:shadow-lg flex items-center justify-center"
                                            onClick={() => setViewedPost(post)}
                                        >
                                            <FiEye className="h-5 w-5 mx-auto" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-800/50 shadow-lg mb-6">
                            <FiSearch className="h-10 w-10 text-secondary-400" />
                        </div>
                        <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 font-sans mb-4">
                            No Posts Found
                        </h3>
                        <p className="text-primary-200 font-sans mb-6">
                            {searchTerm || selectedCategory !== 'all'
                                ? 'Adjust your search or filter to find those funky posts!'
                                : 'No blog posts yet. Time to create something epic!'}
                        </p>
                        {!searchTerm && selectedCategory === 'all' && (
                            <Link
                                to={`/editor/new/${secretOne}/${secretTwo}`}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-400 to-secondary-500 text-white font-bold rounded-full hover:shadow-lg"
                            >
                                Create Your First Post
                            </Link>
                        )}
                    </div>
                )}
            </div>
            {/* Modal for viewing post content */}
            {viewedPost && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70"
                    onClick={() => setViewedPost(null)}
                >
                    <div
                        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full p-8 relative animate-fade-in"
                        style={{ maxHeight: '80vh' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 text-2xl font-bold focus:outline-none"
                            onClick={() => setViewedPost(null)}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {viewedPost.title}
                        </h2>
                        <div className="relative">
                            <div
                                ref={contentRef}
                                className="text-gray-700 dark:text-gray-300 text-start whitespace-pre-line overflow-hidden pr-2"
                                style={{ maxHeight: '60vh' }}
                                dangerouslySetInnerHTML={{ __html: viewedPost.content }}
                            ></div>
                            {isOverflowing && (
                                <div className="absolute bottom-0 left-0 w-full h-12 flex items-end justify-end pointer-events-none bg-gradient-to-t from-white/95 via-white/60 to-transparent dark:from-gray-900/95 dark:via-gray-900/60 dark:to-transparent">
                                    <span className="text-2xl font-bold text-gray-400 mr-4 mb-2 select-none">...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Delete confirmation modal */}
            {deleteConfirmId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Confirm Deletion</h2>
                        <p className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to delete this blog post?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                                onClick={() => setDeleteConfirmId(null)}
                            >
                                No
                            </button>
                            <button
                                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                onClick={() => { handleDelete(deleteConfirmId); setDeleteConfirmId(null); }}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditorPage;
