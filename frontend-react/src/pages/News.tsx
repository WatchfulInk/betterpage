import { useState, useEffect } from "react";
import axios from "axios";
import { getCSRFToken } from "../utils/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface News {
  id_noticia: number;
  nombre_noticia: string;
  fecha: string;
  descripcion: string;
}

const News = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/noticias/", {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCSRFToken(),
        },
      });
      setNews(response.data);
      setError("");
    } catch (err: any) {
      setError(
        "Failed to fetch news: " + (err.response?.data?.error || err.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            Latest News
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Stay updated with our latest announcements and developments
          </p>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF0000]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <article
                  key={item.id_noticia}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => setSelectedNews(item)}
                >
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(item.fecha)}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {item.nombre_noticia}
                    </h2>
                    <p className="text-gray-600 line-clamp-3">
                      {item.descripcion}
                    </p>
                    <div className="mt-4 flex items-center text-[#FF0000] font-medium">
                      Read more
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* News Detail Modal */}
      {selectedNews && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="relative top-20 mx-auto p-8 max-w-3xl bg-white rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-full">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(selectedNews.fecha)}
                </div>
                <div className="mb-4">
                  <img
                    src={`https://placehold.co/800x400/FF0000/FFFFFF/png?text=${selectedNews.nombre_noticia}`}
                    alt={selectedNews.nombre_noticia}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                  {selectedNews.nombre_noticia}
                </h2>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-gray-600 whitespace-pre-line">
                {selectedNews.descripcion}
              </p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default News;
