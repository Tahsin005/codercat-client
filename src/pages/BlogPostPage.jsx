import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { blogPosts, getRelatedPosts } from '../data/blogPosts';
import BlogCard from '../components/BlogCard';
import { FiArrowLeft, FiClock, FiShare2, FiBookmark } from 'react-icons/fi';
import { useGetBlogByIdQuery } from '../api/apiSlice';
import { toast } from 'react-hot-toast';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, isLoading } = useGetBlogByIdQuery(id);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [postShare, setPostShare] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPostShare("http://localhost:5173/blog/" + id);
  }, [post]);

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <div className="animate-pulse max-w-3xl mx-auto">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded mb-6 w-3/4"></div>
          <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">CoderCat Article Not Found</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Oops! The CoderCat article you are looking for does not exist or may have been removed.
        </p>
        <Link to="/blog" className="btn-primary">
          Back to CoderCat Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="relative h-96 md:h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white bg-black/30 hover:bg-black/50 transition-colors px-4 py-2 rounded-lg"
          >
            <FiArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 container-custom p-6 z-20">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-sm text-white/80 mb-3">
              <span className="bg-primary-600 text-white text-xs font-medium px-2.5 py-1 rounded-md">
                {post.category}
              </span>
              <span>•</span>
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMM d, yyyy')}
              </time>
              <span>•</span>
              <span className="flex items-center">
                <FiClock className="mr-1" /> {post.readTime} read
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in">
              {post.title}
            </h1>
            <div className="flex items-center">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <span className="font-medium text-white block">
                  {post.author}
                </span>
                <span className="text-white/70 text-sm">
                  CoderCat Developer & Tech Enthusiast
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row gap-10">
          <article className="max-w-3xl w-full mx-auto">
            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="border-t border-b border-gray-200 dark:border-gray-800 py-6 my-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        to={`/search?q=${tag}`}
                        className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded-full transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" onClick={() => {navigator.clipboard.writeText(postShare); toast.success("Link copied to clipboard")}}>
                    <FiShare2 className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {post.author}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Developer, writer & CoderCat community member
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Dedicated to sharing coding tips, tutorials, and insights that empower developers of all levels. At CoderCat, we believe in learning by doing and coding with curiosity.
              </p>
            </div>
          </article>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Related CoderCat Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map(relatedPost => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostPage;
