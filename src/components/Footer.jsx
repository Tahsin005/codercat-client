import { Link } from 'react-router-dom';
import { FiTwitter, FiInstagram, FiFacebook, FiGithub } from 'react-icons/fi';
import CatImage from '../assets/cat.png';
import { useGetPopularCategoriesQuery } from '../api/apiSlice';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data: popularCategories, isLoading, isError } = useGetPopularCategoriesQuery();
  console.log(popularCategories);
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container-custom py-12 text-start">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div>
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold text-primary-600 dark:text-primary-400"
            >
              <img src={CatImage} alt="Cat" className="w-10 h-10" />
              <span>Coder Cat</span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Purring through lines of code with feline finesse and infinite curiosity.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <FiGithub className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Articles</Link></li>
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About CoderCat</Link></li>
              <li><Link to="/search" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Explore</Link></li>
            </ul>
          </div>

          <div>
            {!isLoading && popularCategories && popularCategories.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Topics</h3>
                <ul className="space-y-2">
                  {popularCategories.map((category, index) => (
                    <li key={index}>
                      <Link to={`/blog?category=${category.name || category}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        {category.name || category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {currentYear} CoderCat. Crafted with paws and precision.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
