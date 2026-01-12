import { motion } from "framer-motion";
import { FaTrophy, FaRocket, FaStar, FaCheckCircle } from "react-icons/fa";

const Highlights = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const highlights = [
    {
      icon: FaTrophy,
      title: "Top-Rated Platform",
      description: "Trusted by thousands of students worldwide",
      stat: "4.8/5",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: FaRocket,
      title: "Fast Processing",
      description: "Applications processed within 24 hours",
      stat: "24hr",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: FaStar,
      title: "Success Rate",
      description: "Of our users secure at least one scholarship",
      stat: "85%",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: FaCheckCircle,
      title: "Verified Listings",
      description: "All scholarships verified and legitimate",
      stat: "100%",
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            What Makes Us Different
          </h2>
          <p className="text-xl text-base-content opacity-70 max-w-3xl mx-auto">
            Numbers that speak for our commitment to your success
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-base-100 rounded-2xl p-8 shadow-xl border border-base-300 text-center transition-all duration-300"
            >
              <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${highlight.color} flex items-center justify-center mb-6 shadow-lg`}>
                <highlight.icon className="text-3xl text-white" />
              </div>
              <div className={`text-5xl font-extrabold bg-gradient-to-r ${highlight.color} bg-clip-text text-transparent mb-3`}>
                {highlight.stat}
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">
                {highlight.title}
              </h3>
              <p className="text-base-content opacity-70">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;
