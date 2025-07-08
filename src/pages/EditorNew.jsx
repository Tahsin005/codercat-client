import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostBlogMutation } from '../api/apiSlice';
import { toast } from 'react-hot-toast';
import { FiCopy } from 'react-icons/fi';

const EditorNew = () => {
    const { secretOne, secretTwo } = useParams();
    const navigate = useNavigate();
    const [postBlog, { isLoading, isError, error }] = usePostBlogMutation();

    const secretValueFromEnvOne = import.meta.env.VITE_EDITOR_SECRET_ONE;
    const secretValueFromEnvTwo = import.meta.env.VITE_EDITOR_SECRET_TWO;

    useEffect(() => {
        if (secretOne !== secretValueFromEnvOne || secretTwo !== secretValueFromEnvTwo) {
            navigate('/');
        }
    }, [secretOne, secretTwo, secretValueFromEnvOne, secretValueFromEnvTwo, navigate]);

    const [form, setForm] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        image: '',
        author: '',
        authorImage: '',
        readTime: '',
        date: new Date().toISOString().slice(0, 10),
    });

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const [imageError, setImageError] = useState(false);
    const [authorImageError, setAuthorImageError] = useState(false);

    const DEFAULT_AUTHOR_IMAGE = 'https://res.cloudinary.com/df0gfmbkh/image/upload/v1738691322/fprwngmyn1bhlkvmgoqv.png';

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleTagKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            tags,
        };

        try {
            await postBlog(payload).unwrap();
            toast.success('Blog post created!');
            navigate(`/editor/${secretOne}/${secretTwo}`);
        } catch (err) {
            toast.error('Failed to create post');
        }
    };

    return (
        <div className="container-custom  py-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-10 text-start">
                <span className="text-primary-600 dark:text-primary-400">Editor</span> New Post
            </h1>
            <form onSubmit={handleSubmit}>
                {/* Post Details */}
                <div className="bg-primary-50 dark:bg-gray-900 rounded-2xl shadow p-8 mb-8">
                    <h2 className="text-xl font-bold mb-6 text-primary-700 dark:text-primary-300 text-start">Post Details</h2>
                    <div className="space-y-6">
                        <div className='text-start'>
                            <label className="text-gray-700 dark:text-gray-200 font-semibold">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
                                required
                            />
                        </div>
                        <div className='text-start'>
                            <label className="text-gray-700 dark:text-gray-200 font-semibold">Excerpt</label>
                            <textarea
                                name="excerpt"
                                value={form.excerpt}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
                                required
                            />
                        </div>
                        <div className='text-start'>
                            <label className="text-gray-700 dark:text-gray-200 font-semibold">Content</label>
                            <textarea
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                rows={8}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Meta Info */}
                <div className="bg-primary-50 dark:bg-gray-900 rounded-2xl shadow p-8 mb-8">
                    <h2 className="text-xl font-bold mb-6 text-primary-700 dark:text-primary-300">Meta</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='text-start'>
                            <label className="text-gray-700 dark:text-gray-200 font-semibold">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
                                required
                            />
                        </div>
                        <div className='text-start'>
                            <label className="text-gray-700 dark:text-gray-200 font-semibold">Tags</label>
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagKeyDown}
                                placeholder="Press Enter to add tag"
                                className="w-full px-4 py-3 mb-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
                            />
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleTagRemove(tag)}
                                            className="ml-2 text-sm font-bold hover:text-red-500"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="md:col-span-2 text-start">
                            <label className="text-gray-700 dark:text-gray-200 font-semibold">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={form.image}
                                onChange={e => { setImageError(false); handleChange(e); }}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
                                required
                            />
                            {form.image && !imageError && (
                                <img
                                    src={form.image}
                                    alt="Preview"
                                    className="mt-3 w-full max-w-xs h-40 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
                                    onError={() => setImageError(true)}
                                />
                            )}
                            {form.image && imageError && (
                                <div className="mt-3 text-sm text-red-500">Could not load image preview.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Author Info */}
                <div className="bg-primary-50 dark:bg-gray-900 rounded-2xl shadow p-8 mb-8">
                    <h2 className="text-xl font-bold mb-6 text-primary-700 dark:text-primary-300">Author Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='text-start'>
                            <label className="text-gray-700 dark:text-gray-200 font-semibold">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={form.author}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
                                required
                            />
                        </div>
                        <div className='text-start'>
                            <label className="text-gray-700 dark:text-gray-200 font-semibold">Author Image URL</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    name="authorImage"
                                    value={form.authorImage}
                                    onChange={e => { setAuthorImageError(false); handleChange(e); }}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
                                    required
                                />
                                <button
                                    type="button"
                                    className="p-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    onClick={() => {
                                        setForm(f => ({ ...f, authorImage: DEFAULT_AUTHOR_IMAGE }));
                                        setAuthorImageError(false);
                                        toast.success('Default author image set!');
                                    }}
                                    title="Use default author image"
                                >
                                    <FiCopy className="h-5 w-5" />
                                </button>
                            </div>
                            {form.authorImage && !authorImageError && (
                                <img
                                    src={form.authorImage}
                                    alt="Author Preview"
                                    className="mt-3 w-20 h-20 object-cover rounded-full border border-gray-300 dark:border-gray-700"
                                    onError={() => setAuthorImageError(true)}
                                />
                            )}
                            {form.authorImage && authorImageError && (
                                <div className="mt-3 text-sm text-red-500">Could not load author image preview.</div>
                            )}
                        </div>
                        <div className='text-start'>
                            <label className="text-gray-700 dark:text-gray-200 font-semibold">Read Time</label>
                            <input
                                type="text"
                                name="readTime"
                                value={form.readTime}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
                                required
                            />
                        </div>
                        <div className='text-start'>
                            <label className="text-gray-700 dark:text-gray-200 font-semibold">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
                                required
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn-primary w-full py-3 mt-6"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating...' : 'Create Post'}
                </button>
                {isError && (
                    <p className="text-red-600 dark:text-red-400 text-center mt-2">
                        {error?.data?.message || 'Failed to create post.'}
                    </p>
                )}
            </form>
        </div>
    );
};

export default EditorNew;
