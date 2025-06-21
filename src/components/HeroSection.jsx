import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getFeaturedPosts } from '../data/blogPosts';

const HeroSection = () => {
  const featuredPosts = getFeaturedPosts();
  const mainFeature = featuredPosts[0];
  const secondaryFeatures = featuredPosts.slice(1, 3);

  return (
    <section className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-950 py-10 md:py-16">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
            <span className="text-primary-600 dark:text-primary-400">Coder</span> Cat
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up">
            Where code meets curiosity — tales of a tech-savvy feline
          </p>
        </div>

        {mainFeature && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
            <div className="md:col-span-7 lg:col-span-8">
              <div className="relative h-full group rounded-xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img
                  src={mainFeature.image}
                  alt={mainFeature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: '400px', objectPosition: 'center' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300 translate-y-0 group-hover:translate-y-[-8px]">
                  <div className="flex items-center space-x-2 text-sm text-white/80 mb-3">
                    <span className="bg-primary-600 text-white text-xs font-medium px-2.5 py-1 rounded-md">
                      {mainFeature.category}
                    </span>
                    <span>•</span>
                    <time dateTime={mainFeature.date}>
                      {format(new Date(mainFeature.date), 'MMM d, yyyy')}
                    </time>
                    <span>•</span>
                    <span>{mainFeature.readTime} read</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                    <Link to={`/blog/${mainFeature.id}`} className="hover:text-primary-300 transition-colors">
                      {mainFeature.title}
                    </Link>
                  </h2>
                  <p className="text-white/90 mb-4 max-w-2xl line-clamp-2 md:line-clamp-3">
                    {mainFeature.excerpt}
                  </p>
                  <div className="flex items-center">
                    <img
                      src={mainFeature.authorImage}
                      alt={mainFeature.author}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <span className="font-medium text-white">
                      {mainFeature.author}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 lg:col-span-4 flex flex-col space-y-6">
              {secondaryFeatures.map(post => (
                <div key={post.id} className="group relative rounded-xl overflow-hidden shadow-lg h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ minHeight: '200px', objectPosition: 'center' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform transition-transform duration-300 translate-y-0 group-hover:translate-y-[-8px]">
                    <div className="flex items-center space-x-2 text-xs text-white/80 mb-2">
                      <span className="bg-primary-600 text-white text-xs font-medium px-2 py-0.5 rounded-md">
                        {post.category}
                      </span>
                      <span>•</span>
                      <time dateTime={post.date}>
                        {format(new Date(post.date), 'MMM d, yyyy')}
                      </time>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      <Link to={`/blog/${post.id}`} className="hover:text-primary-300 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/blog"
            className="btn-primary inline-flex items-center"
          >
            See more cat-code adventures
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
