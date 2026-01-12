import { Link } from "react-router";
import { useState, useEffect } from "react";
import { FaSearch, FaGraduationCap, FaTrophy, FaGlobe, FaBook, FaAward } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="w-11/12 mx-auto relative h-125 sm:h-137.5 md:h-150 lg:h-175 bg-cover bg-center bg-no-repeat overflow-hidden rounded-2xl"
      style={{ 
        backgroundImage: `url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80)`,
      }}
    >
      {/* Animated gradient overlay */}
      <div 
        className={`absolute inset-0 animate-gradient transition-all duration-500 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-indigo-950/98 via-purple-950/95 to-pink-950/92' 
            : 'bg-gradient-to-br from-indigo-900/95 via-purple-900/90 to-pink-900/85'
        }`}
      ></div>

      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-mesh"></div>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 opacity-20">
        {[
          { Icon: FaGraduationCap, delay: 0 },
          { Icon: FaBook, delay: 1 },
          { Icon: FaAward, delay: 2 },
          { Icon: FaTrophy, delay: 3 },
          { Icon: FaGlobe, delay: 4 },
        ].map((item, i) => (
          <item.Icon
            key={i}
            className="absolute text-4xl text-white animate-float-icon"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 2) * 40}%`,
              animationDelay: `${item.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-particle"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#a78bfa' : '#f472b6',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
      </div>

      {/* Animated light beams */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-beam-1"></div>
        <div className="absolute w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-beam-2"></div>
        <div className="absolute w-96 h-96 bg-indigo-400 rounded-full blur-3xl animate-beam-3"></div>
      </div>

      <div className="relative z-10 max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 h-full flex items-center justify-center">
        <div
          className={`max-w-4xl text-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Badge */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div 
              className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm rounded-full text-white animate-bounce-slow transition-all ${
                theme === 'dark' 
                  ? 'bg-white/15 border border-white/20 shadow-lg shadow-purple-500/30' 
                  : 'bg-white/20 shadow-lg shadow-pink-500/30'
              }`}
            >
              <FaTrophy className="text-yellow-300 text-xs sm:text-sm animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold">
                1000+ Scholarships Available
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
            <span 
              className={`bg-gradient-to-r bg-clip-text text-transparent animate-shimmer ${
                theme === 'dark'
                  ? 'from-white via-purple-100 to-pink-100'
                  : 'from-white via-purple-200 to-pink-200'
              }`}
              style={{ 
                backgroundSize: '200% auto',
                animation: 'shimmer 3s linear infinite'
              }}
            >
              Find Your Dream Scholarship Today
            </span>
          </h1>

          <p 
            className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-3xl mx-auto transition-colors ${
              theme === 'dark' ? 'text-gray-50' : 'text-gray-100'
            }`}
          >
            Discover thousands of scholarship opportunities from universities
            worldwide. Start your journey to academic excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12">
            <Link
              to="/scholarships"
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base sm:text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <FaSearch className="relative z-10 text-sm sm:text-base" />
              <span className="relative z-10">Search Scholarships</span>
            </Link>

            <Link
              to="/scholarships"
              className={`inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-sm text-white font-bold text-base sm:text-lg rounded-full border-2 transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/15 border-white/40 hover:bg-white/25 hover:border-white/60'
                  : 'bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50'
              }`}
            >
              <FaGraduationCap className="text-sm sm:text-base" />
              <span>Learn More</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-3xl mx-auto">
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
                className={`text-center p-2 sm:p-3 lg:p-4 backdrop-blur-sm rounded-lg sm:rounded-xl border transition-all duration-300 hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-white/15 border-white/30 hover:bg-white/25'
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <stat.icon 
                  className={`text-xl sm:text-2xl lg:text-3xl mx-auto mb-1 sm:mb-2 ${
                    theme === 'dark' ? 'text-purple-200' : 'text-purple-300'
                  }`} 
                />
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div 
                  className={`text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-200'
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes mesh {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translate(30%, -30%) scale(1.2);
            opacity: 0.5;
          }
          66% {
            transform: translate(-30%, 30%) scale(0.9);
            opacity: 0.4;
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-30px) translateX(20px) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-60px) translateX(-20px) scale(0.8);
            opacity: 1;
          }
          75% {
            transform: translateY(-30px) translateX(10px) scale(1.1);
            opacity: 0.7;
          }
        }

        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-40px) rotate(-5deg);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-20px) rotate(3deg);
            opacity: 0.5;
          }
        }

        @keyframes beam-1 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            top: 20%;
            left: 20%;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            top: 30%;
            left: 30%;
          }
        }

        @keyframes beam-2 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1.2);
            top: 60%;
            right: 20%;
            left: auto;
          }
          50% {
            transform: translate(-50%, -50%) scale(0.8);
            top: 50%;
            right: 30%;
          }
        }

        @keyframes beam-3 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.9);
            bottom: 20%;
            left: 50%;
            top: auto;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            bottom: 30%;
            left: 60%;
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

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }

        .animate-mesh {
          animation: mesh 20s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle linear infinite;
        }

        .animate-float-icon {
          animation: float-icon 10s ease-in-out infinite;
        }

        .animate-beam-1 {
          animation: beam-1 15s ease-in-out infinite;
        }

        .animate-beam-2 {
          animation: beam-2 18s ease-in-out infinite;
        }

        .animate-beam-3 {
          animation: beam-3 20s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Banner;