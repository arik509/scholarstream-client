import { motion } from "framer-motion";
import {
  FaSearch,
  FaShieldAlt,
  FaBell,
  FaChartLine,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const features = [
    {
      icon: FaSearch,
      title: "Smart Search",
      description:
        "Advanced filters to find scholarships that perfectly match your profile and goals.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FaShieldAlt,
      title: "Verified Opportunities",
      description:
        "All scholarships are verified and legitimate, ensuring your time is well spent.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaBell,
      title: "Real-time Alerts",
      description:
        "Get instant notifications about new scholarships and application deadlines.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: FaChartLine,
      title: "Track Progress",
      description:
        "Monitor your applications and track success rates in one convenient dashboard.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: FaUsers,
      title: "Community Support",
      description:
        "Connect with other scholarship seekers and share experiences and tips.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: FaGlobe,
      title: "Global Database",
      description:
        "Access scholarships from universities and organizations around the world.",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-11/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Why Choose ScholarStream?
          </h2>
          <p className="text-xl text-base-content opacity-70 max-w-3xl mx-auto">
            Everything you need to find and apply for scholarships in one
            powerful platform
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300 transition-all duration-300 group"
            >
              <div
                className={`w-16 h-16 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-3 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-base-content opacity-70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
