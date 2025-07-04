import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const BlogCard = ({ post, postIndex }) => {
  const justDoIt = postIndex % 3 === 0;
  return (
    <article
      className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col
        ${justDoIt ? 'col-span-1 row-span-1' : 'col-span-1 row-span-1'}
      `}
    >
      <div className="relative aspect-video">
        <Link to={`/blog/${post.id}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-md">
          {post.category}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 bg-primary-50 dark:bg-gray-800 text-start">
        <div className="flex items-center space-x-2 text-sm text-primary-400 mb-2">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'MMM d, yyyy')}
          </time>
          <span>•</span>
          <span>{post.readTime} read</span>
        </div>

        <h2 className={`font-bold text-xl text-gray-900 dark:text-white mb-2 ${justDoIt ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}>
          <Link to={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-primary-900 dark:text-primary-200 mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center mt-auto">
          <img
            src={post.authorImage}
            alt={post.author}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {post.author}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;