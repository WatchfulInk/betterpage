import { useLocation } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-grow relative flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          {/* 404 Number */}
          <div className="mb-8">
            <span className="text-[#FF0000] text-9xl font-bold">404</span>
          </div>

          {/* Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          
          {/* Attempted URL */}
          <div className="mb-8">
            <p className="text-gray-600 text-lg">
              The page you tried to access doesn't exist:
            </p>
            <p className="text-[#FF0000] font-mono bg-gray-100 p-3 rounded-lg mt-2 inline-block">
              {location.pathname}
            </p>
          </div>

          {/* Action Button */}
          <a
            href="/"
            className="inline-block bg-[#FF0000] text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
          >
            Return to Home
          </a>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center space-x-4">
            <div className="w-3 h-3 bg-[#FF0000] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-3 h-3 bg-[#FF0000] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 bg-[#FF0000] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
