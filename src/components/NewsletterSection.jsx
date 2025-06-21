import { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the email to a backend service
    console.log('Subscribing email:', email);
    setIsSubmitted(true);
    setEmail('');

    // Reset the submission status after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="bg-primary-100 dark:bg-gray-800/50 py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stay in the Loop with CoderCat
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest code snippets, debugging tricks, and purr-fect updates delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              required
            />
            <button
              type="submit"
              className="btn-primary py-3 px-6"
              disabled={isSubmitted}
            >
              {isSubmitted ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            No spam, just clean code and curious cats.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
