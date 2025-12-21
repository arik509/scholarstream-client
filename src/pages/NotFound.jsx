import { Link, useNavigate } from "react-router";
import { FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center">
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>

          <div className="relative">
            <h1 className="text-[180px] md:text-[250px] font-black text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent leading-none animate-bounce">
              404
            </h1>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <MdSchool className="text-6xl md:text-8xl text-primary opacity-20 animate-spin-slow" />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Oops! Page Not Found
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            The scholarship you're looking for seems to have gone on a study
            break. Don't worry, we'll help you find your way back!
          </p>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline btn-primary gap-2 min-w-50"
            >
              <FaArrowLeft />
              Go Back
            </button>

            <Link to="/" className="btn btn-primary gap-2 min-w-50">
              <FaHome />
              Home Page
            </Link>

            <Link
              to="/scholarships"
              className="btn btn-secondary gap-2 min-w-50"
            >
              <FaSearch />
              Browse Scholarships
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Link
            to="/"
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
          >
            <div className="card-body items-center text-center">
              <FaHome className="text-4xl text-primary mb-2" />
              <h3 className="card-title text-lg">Home</h3>
              <p className="text-sm text-gray-600">Return to homepage</p>
            </div>
          </Link>

          <Link
            to="/scholarships"
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
          >
            <div className="card-body items-center text-center">
              <MdSchool className="text-4xl text-secondary mb-2" />
              <h3 className="card-title text-lg">Scholarships</h3>
              <p className="text-sm text-gray-600">Explore opportunities</p>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
          >
            <div className="card-body items-center text-center">
              <FaSearch className="text-4xl text-accent mb-2" />
              <h3 className="card-title text-lg">Dashboard</h3>
              <p className="text-sm text-gray-600">Check your applications</p>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>
            Lost? Try searching for scholarships or contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
