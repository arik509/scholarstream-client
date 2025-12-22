import { Link } from "react-router";
import { useState, useEffect } from "react";
import bannerImage from "../assets/banner.png";
import { FaSearch, FaGraduationCap, FaTrophy, FaGlobe } from "react-icons/fa";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative h-125 sm:h-137.5 md:h-150 lg:h-175 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      
      <div className="absolute inset-0 bg-linear-to-br from-indigo-900/95 via-purple-900/90 to-pink-900/85 animate-linear"></div>

      
      <div className="absolute inset-0 opacity-30 ">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 h-full flex items-center">
        <div
          className={`max-w-3xl transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-4 sm:mb-6 animate-pulse">
            <FaTrophy className="text-yellow-300 text-xs sm:text-sm" />
            <span className="text-xs sm:text-sm font-semibold">
              1000+ Scholarships Available
            </span>
          </div>

          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
            <span className="bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-shimmer">
              Find Your Dream Scholarship Today
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 lg:mb-10 text-gray-100 leading-relaxed">
            Discover thousands of scholarship opportunities from universities
            worldwide. Start your journey to academic excellence.
          </p>

          
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12">
            <Link
              to="/scholarships"
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold text-base sm:text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-linear-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <FaSearch className="relative z-10 text-sm sm:text-base" />
              <span className="relative z-10">Search Scholarships</span>
            </Link>

            <Link
              to="/scholarships"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-base sm:text-lg rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              <FaGraduationCap className="text-sm sm:text-base" />
              <span>Learn More</span>
            </Link>
          </div>

         
          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-xl">
            {[
              {
                icon: FaGraduationCap,
                value: "50K+",
                label: "Students Helped",
              },
              { icon: FaTrophy, value: "$100M+", label: "Scholarships Found" },
              { icon: FaGlobe, value: "150+", label: "Countries" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-2 sm:p-3 lg:p-4 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <stat.icon className="text-xl sm:text-2xl lg:text-3xl text-purple-300 mx-auto mb-1 sm:mb-2" />
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes linear {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(5px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .animate-linear {
          background-size: 200% 200%;
          animation: linear 15s ease infinite;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Banner;
