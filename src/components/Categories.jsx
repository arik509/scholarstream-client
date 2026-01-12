import { motion } from "framer-motion";
import {
  FaUniversity,
  FaFlask,
  FaPalette,
  FaLaptopCode,
  FaHeartbeat,
  FaBalanceScale,
  FaMoneyBillWave,
  FaGlobeAmericas,
} from "react-icons/fa";

const Categories = () => {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const categories = [
    {
      icon: FaUniversity,
      name: "Academic Excellence",
      count: "250+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaFlask,
      name: "STEM Fields",
      count: "180+",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: FaPalette,
      name: "Arts & Humanities",
      count: "120+",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: FaLaptopCode,
      name: "Technology",
      count: "200+",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: FaHeartbeat,
      name: "Healthcare",
      count: "150+",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: FaBalanceScale,
      name: "Law & Policy",
      count: "90+",
      color: "from-amber-500 to-yellow-500",
    },
    {
      icon: FaMoneyBillWave,
      name: "Business",
      count: "170+",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: FaGlobeAmericas,
      name: "International Students",
      count: "300+",
      color: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-base-content opacity-70 max-w-3xl mx-auto">
            Find scholarships in your field of study or area of interest
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300 transition-all duration-300 cursor-pointer group"
            >
              <div
                className={`w-16 h-16 mx-auto rounded-xl bg-linear-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <category.icon className="text-2xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-base-content text-center mb-2 group-hover:text-purple-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-center text-base-content opacity-60 font-semibold">
                {category.count} Scholarships
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/scholarships"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 rounded-xl font-semibold bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            View All Categories
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
