import { Link } from 'react-router-dom';
import NewsletterSection from '../components/NewsletterSection';
import TahsinsImage from '../assets/Tahsin.jpg';
import Catto1 from '../assets/download.jpeg';

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 pt-16 pb-10">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6 animate-fade-in">
            About CoderCat
          </h1>
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto animate-slide-up">
            Navigating the coding cosmos with the curiosity of a cat.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                At CoderCat, we believe learning to code should be as engaging and instinctive as a cat chasing a laser pointer. Our mission is to make programming approachable, fun, and empowering for developers of all levels.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Launched in 2025 by MD. Tahsin Ferdous as a cat-loving creative, CoderCat exists to simplify complex coding topics using playful analogies, clear examples, and a touch of feline charm.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Whether you are debugging in Python, building with React, or just starting out, we are here to make the journey a little more enjoyable — and a lot more cat-tastic.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-100 dark:bg-secondary-900/30 rounded-full z-0"></div>
              <img
                src="https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Developer cat journey"
                className="rounded-xl shadow-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full mb-6 text-3xl">
                🔍
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Curiosity</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Like cats, we dive into code with curiosity — inspecting, exploring, and always ready to pounce on new knowledge.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 flex items-center justify-center bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 rounded-full mb-6 text-3xl">
                🧠
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Accessibility</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We believe coding should be easy to understand. No jargon walls — just clean code, friendly guides, and relatable metaphors.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 flex items-center justify-center bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-full mb-6 text-3xl">
                🎮
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Playfulness</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Learning to code should be fun! We keep things light, engaging, and cat-approved so you stay curious and motivated.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-40 h-40 overflow-hidden rounded-full">
                <img
                  src={TahsinsImage}
                  alt="MD. Tahsin Ferdous"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">MD. Tahsin Ferdous</h3>
              <p className="text-primary-600 dark:text-primary-400 mb-2">Junior Scratch Engineer (a.k.a. Django / golang + React dev)</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                You have to fail a little, die a little, go insane a little.
                ...to come out the other side.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative mx-auto w-40 h-40 overflow-hidden rounded-full">
                <img
                  src={Catto1}
                  alt="Sven the intern"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sven</h3>
              <p className="text-primary-600 dark:text-primary-400 mb-2">Unpaid Intern</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Technically an intern, but mostly here for the free catnip, naps & of course pats.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-50 dark:bg-primary-900/10">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Join Our CoderCat Journey
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Whether you are a beginner, a pro dev, or just a curious cat, CoderCat welcomes you to the litter. Come code, play, and purr with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/blog" className="btn-primary">
                Explore Our Articles
              </Link>
              <a href="mailto:tahsin.ferdous3546@gmail.com" className="btn-outline">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default AboutPage;
