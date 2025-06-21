import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import CategoryFilter from '../components/CategoryFilter';
import { getPostsByCategory } from '../data/blogPosts';

const BlogPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);

    // Small timeout to simulate fetching data
    const timer = setTimeout(() => {
      const filteredPosts = getPostsByCategory(categoryParam);
      setPosts(filteredPosts);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [categoryParam]);

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <div className="bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 pt-16 pb-10">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-6">
            CoderCat Tutorials
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto mb-8">
            Dive into our collection of coding tutorials, programming tips, and development guides.
          </p>

          <CategoryFilter />
        </div>
      </div>

      <div className="container-custom py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl h-96"></div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} featured={post.featured} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No tutorials found
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Sorry, we couldn not find any tutorials in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
