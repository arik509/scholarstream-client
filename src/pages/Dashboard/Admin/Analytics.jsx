import { useState, useEffect } from "react";
import axiosInstance from "../../../config/api";
import Swal from "sweetalert2";
import {
  FaUsers,
  FaBook,
  FaFileAlt,
  FaDollarSign,
  FaChartBar,
  FaChartPie,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalScholarships: 0,
    totalApplications: 0,
    totalFees: 0,
  });
  const [universityData, setUniversityData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const COLORS = [
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ];

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchWithRetry = async (url, retries = 2) => {
    for (let i = 0; i <= retries; i++) {
      try {
        const response = await axiosInstance.get(url, {
          timeout: 30000,
        });
        return { status: "fulfilled", value: response };
      } catch (error) {
        if (i === retries) {
          return { status: "rejected", reason: error };
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  };

  const fetchAnalytics = async () => {
    try {
      setError(false);

      const responses = await Promise.all([
        fetchWithRetry("/api/users"),
        fetchWithRetry("/api/scholarships?limit=1000"),
        fetchWithRetry("/api/applications"),
      ]);

      const usersData =
        responses[0].status === "fulfilled" ? responses[0].value.data : [];
      const scholarshipsResponse =
        responses[1].status === "fulfilled"
          ? responses[1].value.data
          : { scholarships: [] };
      const applicationsData =
        responses[2].status === "fulfilled" ? responses[2].value.data : [];

      const scholarshipsData =
        scholarshipsResponse.scholarships || scholarshipsResponse;

      const totalFees = applicationsData
        .filter((app) => app.paymentStatus === "paid")
        .reduce(
          (sum, app) => sum + (app.applicationFees + app.serviceCharge),
          0
        );

      setStats({
        totalUsers: Array.isArray(usersData) ? usersData.length : 0,
        totalScholarships: Array.isArray(scholarshipsData)
          ? scholarshipsData.length
          : 0,
        totalApplications: Array.isArray(applicationsData)
          ? applicationsData.length
          : 0,
        totalFees,
      });

      const universityCount = applicationsData.reduce((acc, app) => {
        acc[app.universityName] = (acc[app.universityName] || 0) + 1;
        return acc;
      }, {});

      const universityChartData = Object.entries(universityCount)
        .map(([name, count]) => ({ name, applications: count }))
        .sort((a, b) => b.applications - a.applications)
        .slice(0, 6);

      setUniversityData(universityChartData);

      const categoryCount = applicationsData.reduce((acc, app) => {
        acc[app.scholarshipCategory] = (acc[app.scholarshipCategory] || 0) + 1;
        return acc;
      }, {});

      const categoryChartData = Object.entries(categoryCount).map(
        ([name, value]) => ({ name, value })
      );

      setCategoryData(categoryChartData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      setError(true);

      Swal.fire({
        title: "Error!",
        text: "Failed to load analytics data. Please try again.",
        icon: "error",
        confirmButtonColor: "#8b5cf6",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-gray-600">Loading analytics data...</p>
        <p className="text-xs text-gray-400">
          This may take a moment on first load
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="text-error text-6xl">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800">
          Failed to Load Analytics
        </h2>
        <p className="text-gray-600">There was an error loading the data.</p>
        <button
          onClick={() => {
            setLoading(true);
            setError(false);
            fetchAnalytics();
          }}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FaChartBar className="text-4xl text-primary" />
        <h1 className="text-3xl font-bold ">
          Analytics Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat bg-linear-to-br from-purple-500 to-purple-600 text-white shadow-xl rounded-lg">
          <div className="stat-figure text-white opacity-80">
            <FaUsers className="text-4xl" />
          </div>
          <div className="stat-title text-purple-100">Total Users</div>
          <div className="stat-value">{stats.totalUsers}</div>
          <div className="stat-desc text-purple-100">Registered accounts</div>
        </div>

        <div className="stat bg-linear-to-br from-pink-500 to-pink-600 text-white shadow-xl rounded-lg">
          <div className="stat-figure text-white opacity-80">
            <FaBook className="text-4xl" />
          </div>
          <div className="stat-title text-pink-100">Total Scholarships</div>
          <div className="stat-value">{stats.totalScholarships}</div>
          <div className="stat-desc text-pink-100">Available opportunities</div>
        </div>

        <div className="stat bg-linear-to-br from-cyan-500 to-cyan-600 text-white shadow-xl rounded-lg">
          <div className="stat-figure text-white opacity-80">
            <FaFileAlt className="text-4xl" />
          </div>
          <div className="stat-title text-cyan-100">Total Applications</div>
          <div className="stat-value">{stats.totalApplications}</div>
          <div className="stat-desc text-cyan-100">Submitted by students</div>
        </div>

        <div className="stat bg-linear-to-br from-green-500 to-green-600 text-white shadow-xl rounded-lg">
          <div className="stat-figure text-white opacity-80">
            <FaDollarSign className="text-4xl" />
          </div>
          <div className="stat-title text-green-100">Total Fees Collected</div>
          <div className="stat-value">${stats.totalFees.toFixed(2)}</div>
          <div className="stat-desc text-green-100">Revenue generated</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <FaChartBar className="text-primary" />
              Applications by University
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Top 6 universities with most applications
            </p>

            {universityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={universityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="applications"
                    fill="#8b5cf6"
                    name="Applications"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No application data available
              </div>
            )}
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <FaChartPie className="text-primary" />
              Applications by Category
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Distribution across scholarship categories
            </p>

            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No category data available
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl mt-6">
        <div className="card-body">
          <h2 className="card-title">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Average Fee per Application</div>
              <div className="stat-value text-primary text-2xl">
                $
                {stats.totalApplications > 0
                  ? (stats.totalFees / stats.totalApplications).toFixed(2)
                  : 0}
              </div>
            </div>

            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Scholarships per User</div>
              <div className="stat-value text-secondary text-2xl">
                {stats.totalUsers > 0
                  ? (stats.totalScholarships / stats.totalUsers).toFixed(2)
                  : 0}
              </div>
            </div>

            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Applications per Scholarship</div>
              <div className="stat-value text-accent text-2xl">
                {stats.totalScholarships > 0
                  ? (stats.totalApplications / stats.totalScholarships).toFixed(
                      2
                    )
                  : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
