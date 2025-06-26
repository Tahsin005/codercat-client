import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import NewsletterSection from '../components/NewsletterSection';
import BlogCard from '../components/BlogCard';
import { useGetRecentBlogsQuery } from '../api/apiSlice';

const HomePage = () => {
  const { data: recentPosts = [], isLoading, isError } = useGetRecentBlogsQuery();

  return (
    <div>
      <HeroSection />

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest Tutorials</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
                Fresh coding tips and tricks from CoderCat
              </p>
            </div>
            <Link
              to="/blog"
              className="btn-outline flex items-center self-start"
            >
              View all tutorials
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl h-96"></div>
              ))
            ) : isError ? (
              <div className="col-span-full text-center text-red-500">Failed to load recent posts.</div>
            ) : recentPosts.length > 0 ? (
              recentPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">No recent posts found.</div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose CoderCat?</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Your friendly coding companion, guiding you through programming challenges with curiosity, precision, and fun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center transform transition-transform duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4 text-primary-500 mx-auto">🐾</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Curious Coding</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Like a curious cat, we explore every corner of code to find elegant solutions.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center transform transition-transform duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4 text-secondary-500 mx-auto">💡</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Clear Insights</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We break down complex programming concepts with clarity and precision.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center transform transition-transform duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4 text-accent-500 mx-auto">🎉</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Fun Learning</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Programming should be enjoyable. We make learning a playful and rewarding journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default HomePage;
