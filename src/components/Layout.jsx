import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeProvider } from '../context/ThemeContext';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default Layout;