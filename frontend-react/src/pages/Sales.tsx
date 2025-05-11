import { useState, useEffect } from "react";
import axios from "axios";
import { getCSRFToken } from "../utils/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Producto {
  id_producto: number;
  nombre_producto: string;
  precio: number;
  stock: number;
}

interface Venta {
  id_venta: number;
  nombre_venta: string;
  producto: Producto;
  cantidad: number;
  fecha: string;
}

const Sales = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVenta, setEditingVenta] = useState<Venta | null>(null);
  const [formData, setFormData] = useState({
    nombre_venta: "",
    producto: "",
    cantidad: "",
    fecha: new Date().toISOString().split("T")[0],
  });

  const fetchVentas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/ventas/", {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCSRFToken(),
        },
      });
      setVentas(response.data);
      setError("");
    } catch (err: any) {
      setError(
        "Failed to fetch sales: " + (err.response?.data?.error || err.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/productos/", {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCSRFToken(),
        },
      });
      setProductos(response.data);
    } catch (err: any) {
      setError(
        "Failed to fetch products: " +
          (err.response?.data?.error || err.message)
      );
    }
  };

  useEffect(() => {
    fetchVentas();
    fetchProductos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        nombre_venta: formData.nombre_venta,
        producto_id: formData.producto,
        cantidad: formData.cantidad,
        fecha: formData.fecha,
      };

      if (editingVenta) {
        await axios.put(
          `http://localhost:8000/api/ventas/${editingVenta.id_venta}/`,
          submitData,
          {
            withCredentials: true,
            headers: {
              "X-CSRFToken": getCSRFToken(),
            },
          }
        );
      } else {
        await axios.post("http://localhost:8000/api/ventas/", submitData, {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCSRFToken(),
          },
        });
      }
      fetchVentas();
      setIsModalOpen(false);
      setEditingVenta(null);
      setFormData({
        nombre_venta: "",
        producto: "",
        cantidad: "",
        fecha: new Date().toISOString().split("T")[0],
      });
    } catch (err: any) {
      setError(
        "Failed to save sale: " + (err.response?.data?.error || err.message)
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this sale?")) {
      try {
        await axios.delete(`http://localhost:8000/api/ventas/${id}/`, {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCSRFToken(),
          },
        });
        fetchVentas();
      } catch (err: any) {
        setError(
          "Failed to delete sale: " + (err.response?.data?.error || err.message)
        );
      }
    }
  };

  const handleEdit = (venta: Venta) => {
    setEditingVenta(venta);
    setFormData({
      nombre_venta: venta.nombre_venta,
      producto: venta.producto.id_producto.toString(),
      cantidad: venta.cantidad.toString(),
      fecha: venta.fecha,
    });
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const calculateStats = () => {
    const totalSales = ventas.length;
    const totalRevenue = ventas.reduce(
      (sum, venta) => sum + venta.producto.precio * venta.cantidad,
      0
    );
    const totalProducts = ventas.reduce(
      (sum, venta) => sum + venta.cantidad,
      0
    );
    const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

    return {
      totalSales,
      totalRevenue,
      totalProducts,
      averageOrderValue,
    };
  };

  const getChartData = () => {
    // Get the last 6 months
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        label: date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
      };
    }).reverse();

    const salesByMonth = last6Months.map(({ year, month }) => {
      const monthSales = ventas.filter((venta) => {
        const ventaDate = new Date(venta.fecha);
        return (
          ventaDate.getFullYear() === year && ventaDate.getMonth() === month
        );
      });
      return monthSales.reduce(
        (sum, venta) => sum + venta.producto.precio * venta.cantidad,
        0
      );
    });

    return {
      labels: last6Months.map(({ label }) => label),
      datasets: [
        {
          label: "Monthly Revenue",
          data: salesByMonth,
          borderColor: "#FF0000",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          tension: 0.4,
        },
      ],
    };
  };

  const getTopProducts = () => {
    const productSales = ventas.reduce((acc, venta) => {
      const key = venta.producto.id_producto;
      if (!acc[key]) {
        acc[key] = {
          name: venta.producto.nombre_producto,
          quantity: 0,
          revenue: 0,
        };
      }
      acc[key].quantity += venta.cantidad;
      acc[key].revenue += venta.producto.precio * venta.cantidad;
      return acc;
    }, {} as Record<number, { name: string; quantity: number; revenue: number }>);

    return Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  const stats = calculateStats();
  const chartData = getChartData();
  const topProducts = getTopProducts();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Sales Dashboard
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Track your sales performance and manage transactions
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#FF0000] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Add New Sale
            </button>
          </div>

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
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Sales
                  </h3>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalSales}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Total transactions
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Revenue
                  </h3>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    ${stats.totalRevenue.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Total earnings</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-sm font-medium text-gray-500">
                    Products Sold
                  </h3>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalProducts}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Total units sold</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-sm font-medium text-gray-500">
                    Average Order Value
                  </h3>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    ${stats.averageOrderValue.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Per transaction</p>
                </div>
              </div>

              {/* Charts and Top Products */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Revenue Trend
                  </h3>
                  <div className="h-80">
                    <Line
                      data={chartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              callback: (value) => `$${value}`,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Top Products
                  </h3>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {product.quantity} units
                          </p>
                        </div>
                        <p className="font-medium text-[#FF0000]">
                          ${product.revenue.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Sales Table */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    All Sales
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sale Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...ventas]
                        .sort(
                          (a, b) =>
                            new Date(b.fecha).getTime() -
                            new Date(a.fecha).getTime()
                        )
                        .map((venta) => (
                          <tr key={venta.id_venta} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {venta.nombre_venta}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {venta.producto.nombre_producto}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {venta.cantidad}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              $
                              {(venta.producto.precio * venta.cantidad).toFixed(
                                2
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(venta.fecha)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                onClick={() => handleEdit(venta)}
                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(venta.id_venta)}
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
              </div>
            </>
          )}
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-10 max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-8">
              {editingVenta ? "Edit Sale" : "Add New Sale"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Sale Name
                </label>
                <input
                  type="text"
                  value={formData.nombre_venta}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre_venta: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF0000] focus:ring-[#FF0000] text-lg py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Product
                </label>
                <select
                  value={formData.producto}
                  onChange={(e) =>
                    setFormData({ ...formData, producto: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF0000] focus:ring-[#FF0000] text-lg py-2"
                  required
                >
                  <option value="">Select a product</option>
                  {productos.map((producto) => (
                    <option
                      key={producto.id_producto}
                      value={producto.id_producto}
                    >
                      {producto.nombre_producto}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={formData.cantidad}
                  onChange={(e) =>
                    setFormData({ ...formData, cantidad: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF0000] focus:ring-[#FF0000] text-lg py-2"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={(e) =>
                    setFormData({ ...formData, fecha: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF0000] focus:ring-[#FF0000] text-lg py-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingVenta(null);
                    setFormData({
                      nombre_venta: "",
                      producto: "",
                      cantidad: "",
                      fecha: new Date().toISOString().split("T")[0],
                    });
                  }}
                  className="px-6 py-3 text-lg font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-lg font-medium text-white bg-[#FF0000] rounded-md hover:bg-red-700"
                >
                  {editingVenta ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Sales;
