import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Innovation for a Better Tomorrow",
      description:
        "Discover Toshiba's latest technology solutions designed to enhance every aspect of your life.",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80",
      alt: "Toshiba latest products showcase",
    },
    {
      title: "Powering Your Digital Future",
      description:
        "Leading the way in digital transformation with cutting-edge solutions.",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80",
      alt: "Digital transformation",
    },
    {
      title: "Sustainable Technology",
      description:
        "Committed to creating a sustainable future through innovative technology.",
      image:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80",
      alt: "Sustainable technology",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-grow relative">
        <div className="h-full w-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              } flex flex-col`}
            >
              <div className="relative flex-1 flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-black/30 z-10" />
                <div className="relative z-20 w-full flex flex-col items-center justify-center">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white text-center drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white text-center drop-shadow">
                    {slide.description}
                  </p>
                  <div className="relative z-20 flex justify-center space-x-2 pt-8 bg-transparent">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          idx === currentSlide ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
