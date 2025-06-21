import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const BlogCard = ({ post, featured = false }) => {
  console.log(post);
  return (
    <article
      className={`card group h-full flex flex-col overflow-hidden animate-fade-in ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <div className="relative overflow-hidden aspect-video">
        <Link to={`/blog/${post.id}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-medium px-2.5 py-1 rounded-md">
          {post.category}
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'MMM d, yyyy')}
          </time>
          <span>•</span>
          <span>{post.readTime} read</span>
        </div>

        <h2 className={`font-bold mb-3 transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400 ${
          featured ? 'text-2xl md:text-3xl' : 'text-xl'
        }`}>
          <Link to={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center">
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