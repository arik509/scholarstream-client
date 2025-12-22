import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaMinus,
  FaQuestionCircle,
  FaCheckCircle,
} from "react-icons/fa";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "How do I apply for scholarships?",
      answer:
        "Browse scholarships, click 'View Details,' then click 'Apply' on the scholarship page. You'll be guided through the payment and application process.",
      icon: "🎓",
    },
    {
      question: "Are there any application fees?",
      answer:
        "Some scholarships have application fees while others are free. The fee amount is clearly displayed on each scholarship card.",
      icon: "💰",
    },
    {
      question: "How long does the review process take?",
      answer:
        "Review times vary by scholarship. You can track your application status in your dashboard and receive updates from moderators.",
      icon: "⏱️",
    },
    {
      question: "Can I apply for multiple scholarships?",
      answer:
        "Yes! You can apply for as many scholarships as you qualify for. Manage all your applications from your student dashboard.",
      icon: "📚",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative py-16 lg:py-24 bg-linear-to-br from-white via-purple-50/30 to-pink-50/30 overflow-hidden">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-purple-500 rounded-full"></div>
        <div className="absolute top-40 right-20 w-32 h-32 border-4 border-pink-500 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 border-4 border-blue-500 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 border-4 border-purple-500 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold">
              <FaQuestionCircle />
              <span>FAQ</span>
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            <span className="bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            Get answers to common questions about scholarships and applications
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants} className="group">
                <motion.div
                  className={`relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    activeIndex === index ? "ring-2 ring-purple-500" : ""
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  
                  {activeIndex === index && (
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-blue-500"
                      layoutId="activeBar"
                    />
                  )}

                 
                  <button
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? -1 : index)
                    }
                    className="w-full text-left p-5 sm:p-6 flex items-center gap-4 hover:bg-purple-50/50 transition-colors duration-300"
                  >
                    
                    <motion.div
                      className="shrink-0 w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {faq.icon}
                    </motion.div>

                  
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                        {faq.question}
                      </h3>
                    </div>

                    
                    <motion.div
                      className="shrink-0"
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeIndex === index ? (
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <FaMinus className="text-purple-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                          <FaPlus className="text-gray-600 group-hover:text-purple-600 transition-colors" />
                        </div>
                      )}
                    </motion.div>
                  </button>

                  
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-16 sm:pl-22">
                          <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            className="bg-linear-to-r from-purple-50 to-pink-50 p-4 rounded-xl"
                          >
                            <div className="flex items-start gap-2">
                              <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="bg-linear-to-r from-purple-100 to-pink-100 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Our support team is here to help you with any queries
              </p>
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300">
                Contact Support
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
