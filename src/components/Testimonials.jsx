import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      university: "MIT",
      country: "USA",
      image: "https://i.pravatar.cc/150?img=1",
      quote:
        "ScholarStream helped me find the perfect scholarship. Now I'm studying at my dream university!",
      rating: 5,
    },
    {
      name: "Ahmed Khan",
      university: "Oxford",
      country: "UK",
      image: "https://i.pravatar.cc/150?img=12",
      quote:
        "The platform made the application process so simple. Highly recommended for all students!",
      rating: 5,
    },
    {
      name: "Maria Garcia",
      university: "Cambridge",
      country: "UK",
      image: "https://i.pravatar.cc/150?img=5",
      quote:
        "I found multiple opportunities and got accepted. This platform changed my life!",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-16 lg:py-24 bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold">
              <FaGraduationCap />
              <span>Student Success Stories</span>
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            <span className="bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              What Our Students Say
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            Join thousands of students who achieved their dreams with
            ScholarStream
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
             
              <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                
                <div className="absolute inset-0 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-0.5">
                  <div className="h-full w-full bg-white rounded-2xl"></div>
                </div>

                <div className="relative p-6 sm:p-8">
                  
                  <div className="absolute top-4 right-4 text-purple-200 text-4xl opacity-50">
                    <FaQuoteLeft />
                  </div>

                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-br from-purple-400 to-pink-400 p-[3px]">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                     
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaGraduationCap className="text-purple-500" />
                        <span>{testimonial.university}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {testimonial.country}
                      </p>
                    </div>
                  </div>

                  
                  <p className="text-gray-700 italic leading-relaxed mb-6 text-sm sm:text-base">
                    "{testimonial.quote}"
                  </p>

                  
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <FaStar className="text-yellow-400 text-lg" />
                      </motion.div>
                    ))}
                  </div>
                </div>

             
                <div className="h-1 bg-linear-to-r from-purple-500 via-pink-500 to-blue-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        
        <motion.div
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Want to share your success story?
          </p>
          <Link to="/scholarships" className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
            Submit Your Story
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
