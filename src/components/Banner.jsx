import { Link } from 'react-router';
import bannerImage from '../assets/banner.png';
import { FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <section 
      className="relative min-h-150 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-[#1e3a8a]/95 via-[#3b82f6]/85 to-transparent"></div>
      
      <div className="relative z-10 max-w-11/12 mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your Dream Scholarship Today
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-gray-100">
            Discover thousands of scholarship opportunities from universities worldwide. Start your journey to academic excellence.
          </p>
          <Link to="/scholarships" className="inline-block px-8 py-4 bg-white text-[#7c3aed] font-bold text-lg rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
           Search Scholarships
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
