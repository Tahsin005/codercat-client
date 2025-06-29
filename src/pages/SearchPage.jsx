import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useGetBlogsBySearchQuery, useGetPopularCategoriesQuery } from '../api/apiSlice';
import SearchBar from '../components/SearchBar';
import BlogCard from '../components/BlogCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: searchResults, isLoading: isSearchLoading } = useGetBlogsBySearchQuery(query);
  const { data: popularCategories, isLoading: isPopularCategoriesLoading } = useGetPopularCategoriesQuery();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Update results and loading state based on query
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      if (!isSearchLoading && searchResults) {
        setResults(searchResults);
        setIsLoading(false);
      }
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query, searchResults, isSearchLoading]);

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <div className="bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 pt-16 pb-10">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Search Tutorials
          </h1>
          <SearchBar />
        </div>
      </div>

      <div className="container-custom py-12">
        {query ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {isLoading ? 'Searching...' : `Search results for "${query}"`}
              </h2>
              {!isLoading && (
                <p className="text-gray-700 dark:text-gray-300">
                  Found {results.length} {results.length === 1 ? 'result' : 'results'}
                </p>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl h-96"></div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  <FiSearch className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No results found
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  We couldn't find any tutorials matching your search.
                </p>
                <Link to="/blog" className="btn-primary">
                  Browse all tutorials
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-4">
              <FiSearch className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Search for coding knowledge
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Enter a search term above.
            </p>
            <div className="grid grid-cols-1 gap-4 text-left mt-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center gap-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Popular categories</h3>
                <div className="flex flex-wrap gap-2">
                  {isPopularCategoriesLoading ? 'Loading...' : popularCategories.length > 0 ? popularCategories.map(category => (
                    <Link to={`/blog?category=${category}`} key={category} className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-800 dark:text-gray-200">
                      {category}
                    </Link>
                  )) : 'No popular categories'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
