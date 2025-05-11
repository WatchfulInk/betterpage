import { useState, useEffect } from "react";
import axios from "axios";
import { getCSRFToken } from "../utils/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Service {
  id_servicio: number;
  nombre_servicio: string;
  precio: number;
  descripcion: string;
}

type ViewMode = "table" | "card";

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [formData, setFormData] = useState({
    nombre_servicio: "",
    precio: "",
    descripcion: "",
  });

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/servicios/", {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCSRFToken(),
        },
      });
      setServices(response.data);
      setError("");
    } catch (err: any) {
      setError(
        "Failed to fetch services: " +
          (err.response?.data?.error || err.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const serviceData = {
        ...formData,
        precio: parseFloat(formData.precio),
      };

      if (editingService) {
        await axios.put(
          `http://localhost:8000/api/servicios/${editingService.id_servicio}/`,
          serviceData,
          {
            withCredentials: true,
            headers: {
              "X-CSRFToken": getCSRFToken(),
            },
          }
        );
      } else {
        await axios.post("http://localhost:8000/api/servicios/", serviceData, {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCSRFToken(),
          },
        });
      }

      setIsModalOpen(false);
      setEditingService(null);
      setFormData({
        nombre_servicio: "",
        precio: "",
        descripcion: "",
      });
      fetchServices();
    } catch (err: any) {
      setError(
        "Failed to save service: " + (err.response?.data?.error || err.message)
      );
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      nombre_servicio: service.nombre_servicio,
      precio: service.precio.toString(),
      descripcion: service.descripcion,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`http://localhost:8000/api/servicios/${id}/`, {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCSRFToken(),
          },
        });
        fetchServices();
      } catch (err: any) {
        setError(
          "Failed to delete service: " +
            (err.response?.data?.error || err.message)
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                  viewMode === "table"
                    ? "bg-white shadow-sm text-[#FF0000]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                  viewMode === "card"
                    ? "bg-white shadow-sm text-[#FF0000]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={() => {
                setEditingService(null);
                setFormData({
                  nombre_servicio: "",
                  precio: "",
                  descripcion: "",
                });
                setIsModalOpen(true);
              }}
              className="bg-[#FF0000] text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Add Service
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : viewMode === "table" ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id_servicio}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {service.nombre_servicio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${Number(service.precio).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {service.descripcion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-[#FF0000] hover:text-red-700 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service.id_servicio)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id_servicio}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {service.nombre_servicio}
                    </h3>
                    <span className="text-lg font-bold text-[#FF0000]">
                      ${Number(service.precio).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {service.descripcion}
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-[#FF0000] hover:text-red-700 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id_servicio)}
                      className="text-red-600 hover:text-red-900 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <div className="relative top-20 mx-auto p-8 border w-[500px] shadow-lg rounded-lg bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-gray-900">
                  {editingService ? "Edit Service" : "Add New Service"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="nombre_servicio"
                    value={formData.nombre_servicio}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-[#FF0000] focus:ring-[#FF0000]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-[#FF0000] focus:ring-[#FF0000]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-[#FF0000] focus:ring-[#FF0000]"
                  />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-medium text-white bg-[#FF0000] hover:bg-red-700 rounded-md transition-colors duration-200"
                  >
                    {editingService ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Services;
