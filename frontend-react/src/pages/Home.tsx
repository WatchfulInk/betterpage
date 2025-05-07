import { useState, useEffect } from "react";
import { BiChevronRight, BiLaptop } from "react-icons/bi";
import { BsArrowRight, BsHeadphones } from "react-icons/bs";
import { CgSmartphone } from "react-icons/cg";
import { CiHardDrive, CiMonitor } from "react-icons/ci";
import { FiCpu } from "react-icons/fi";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const heroSlides = [
    {
      title: "Innovation for a Better Tomorrow",
      description:
        "Discover Toshiba's latest technology solutions designed to enhance every aspect of your life.",
      image: "/api/placeholder/1200/600",
      alt: "Toshiba latest products showcase",
    },
    {
      title: "Business Solutions That Drive Success",
      description:
        "Enterprise-grade technology built for reliability, security, and performance.",
      image: "/api/placeholder/1200/600",
      alt: "Toshiba business solutions",
    },
    {
      title: "Sustainable Technology for a Greener Future",
      description:
        "Committed to developing eco-friendly innovations that reduce environmental impact.",
      image: "/api/placeholder/1200/600",
      alt: "Toshiba sustainable technology",
    },
  ];

  const products = [
    {
      name: "Laptops",
      icon: <BiLaptop size={24} />,
      description: "Powerful & portable computing solutions",
    },
    {
      name: "TVs",
      icon: <CiMonitor size={24} />,
      description: "Crystal clear displays with smart features",
    },
    {
      name: "Storage",
      icon: <CiHardDrive size={24} />,
      description: "Reliable data storage solutions",
    },
    {
      name: "Mobile",
      icon: <CgSmartphone size={24} />,
      description: "Innovative smartphone technology",
    },
    {
      name: "Audio",
      icon: <BsHeadphones size={24} />,
      description: "Premium sound experiences",
    },
    {
      name: "Components",
      icon: <FiCpu size={24} />,
      description: "High-quality electronic components",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-32 bg-red-600 text-white font-bold flex items-center justify-center">
                  TOSHIBA
                </div>
              </div>
              <nav className="hidden md:ml-10 md:flex space-x-8">
                <a
                  href="#"
                  className="text-gray-800 hover:text-red-600 font-medium"
                >
                  Products
                </a>
                <a
                  href="#"
                  className="text-gray-800 hover:text-red-600 font-medium"
                >
                  Solutions
                </a>
                <a
                  href="#"
                  className="text-gray-800 hover:text-red-600 font-medium"
                >
                  Support
                </a>
                <a
                  href="#"
                  className="text-gray-800 hover:text-red-600 font-medium"
                >
                  About
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 hidden md:block">
                Contact Us
              </button>
              <button
                className="ml-4 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-2">
              <a
                href="#"
                className="block py-2 text-gray-800 hover:text-red-600"
              >
                Products
              </a>
              <a
                href="#"
                className="block py-2 text-gray-800 hover:text-red-600"
              >
                Solutions
              </a>
              <a
                href="#"
                className="block py-2 text-gray-800 hover:text-red-600"
              >
                Support
              </a>
              <a
                href="#"
                className="block py-2 text-gray-800 hover:text-red-600"
              >
                About
              </a>
              <button className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full text-left">
                Contact Us
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-900 h-96">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl mb-8 max-w-lg">{slide.description}</p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md flex items-center">
                  Learn More <BsArrowRight className="ml-2" size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-8 rounded-full ${
                index === currentSlide ? "bg-red-600" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Product Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 p-3 rounded-full text-red-600 mr-4">
                    {product.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <a
                  href="#"
                  className="text-red-600 font-medium flex items-center group-hover:underline"
                >
                  Explore {product.name}{" "}
                  <BiChevronRight size={16} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">
                Leading Innovation Since 1875
              </h2>
              <p className="text-gray-600 mb-6">
                For nearly 150 years, Toshiba has been at the forefront of
                technological innovation, developing solutions that transform
                how we live and work. Our commitment to quality, reliability,
                and forward-thinking continues to drive our success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md">
                  Our History
                </button>
                <button className="border border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-md">
                  Latest Research
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/api/placeholder/600/400"
                alt="Toshiba innovation"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News & Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Latest News & Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="/api/placeholder/400/250"
                alt="News item"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-red-600 font-medium">
                  Press Release
                </span>
                <h3 className="text-xl font-semibold mt-2 mb-3">
                  Toshiba Unveils New Generation of Energy Solutions
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover how our latest energy management systems are helping
                  businesses reduce costs and environmental impact.
                </p>
                <a
                  href="#"
                  className="text-red-600 font-medium flex items-center hover:underline"
                >
                  Read More <BiChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="/api/placeholder/400/250"
                alt="News item"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-red-600 font-medium">
                  Case Study
                </span>
                <h3 className="text-xl font-semibold mt-2 mb-3">
                  How Toshiba Transformed Manufacturing for Industry Leader
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how our industrial automation solutions improved
                  efficiency by 35% for a global manufacturing company.
                </p>
                <a
                  href="#"
                  className="text-red-600 font-medium flex items-center hover:underline"
                >
                  Read More <BiChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="/api/placeholder/400/250"
                alt="News item"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-red-600 font-medium">
                  Technology
                </span>
                <h3 className="text-xl font-semibold mt-2 mb-3">
                  The Future of AI in Consumer Electronics
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore how Toshiba is integrating advanced AI capabilities
                  into everyday consumer products.
                </p>
                <a
                  href="#"
                  className="text-red-600 font-medium flex items-center hover:underline"
                >
                  Read More <BiChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="h-10 w-32 bg-red-600 text-white font-bold flex items-center justify-center mb-4">
                TOSHIBA
              </div>
              <p className="text-gray-400">
                Committed to people, committed to the future.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Laptops
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    TVs & Displays
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Storage
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Office Solutions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Sustainability
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Find a Retailer
                  </a>
                </li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.89 11.71l-3.76 2.27c-.33.2-.74-.04-.74-.43V9.49c0-.39.42-.63.75-.42l3.74 2.27c.33.2.33.67.01.87z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Toshiba Corporation. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Terms of Use
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Cookie Settings
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
