import { useState, useEffect } from "react";
import axios from "axios";
import { getCSRFToken } from "../utils/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Trabajo {
  id_trabajo: number;
  nombre_trabajo: string;
  fecha_publicacion: string;
  descripcion: string;
}

const Careers = () => {
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTrabajos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/trabajos/", {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCSRFToken(),
        },
      });
      setTrabajos(response.data);
      setError("");
    } catch (err: any) {
      setError(
        "Failed to fetch jobs: " + (err.response?.data?.error || err.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrabajos();
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
            Job Opportunities
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Explore our current job openings and career opportunities
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
            <div className="space-y-6">
              {trabajos.map((trabajo) => (
                <article
                  key={trabajo.id_trabajo}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {trabajo.nombre_trabajo}
                      </h2>
                      <span className="px-4 py-2 bg-[#FF0000] text-white rounded-full text-sm font-medium">
                        {formatDate(trabajo.fecha_publicacion)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-lg">
                      {trabajo.descripcion}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
