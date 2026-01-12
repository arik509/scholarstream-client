import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Statistics = () => {
  const [counts, setCounts] = useState({
    scholarships: 0,
    students: 0,
    countries: 0,
    funding: 0,
  });

  const finalCounts = {
    scholarships: 1000,
    students: 50000,
    countries: 150,
    funding: 50,
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounts((prev) => ({
        scholarships: Math.min(
          prev.scholarships + Math.ceil(finalCounts.scholarships / steps),
          finalCounts.scholarships
        ),
        students: Math.min(
          prev.students + Math.ceil(finalCounts.students / steps),
          finalCounts.students
        ),
        countries: Math.min(
          prev.countries + Math.ceil(finalCounts.countries / steps),
          finalCounts.countries
        ),
        funding: Math.min(
          prev.funding + Math.ceil(finalCounts.funding / steps),
          finalCounts.funding
        ),
      }));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      number: `${counts.scholarships.toLocaleString()}+`,
      label: "Available Scholarships",
      color: "from-purple-600 to-pink-600",
    },
    {
      number: `${counts.students.toLocaleString()}+`,
      label: "Students Helped",
      color: "from-blue-600 to-cyan-600",
    },
    {
      number: `${counts.countries}+`,
      label: "Countries Worldwide",
      color: "from-green-600 to-teal-600",
    },
    {
      number: `$${counts.funding}M+`,
      label: "Total Funding Awarded",
      color: "from-orange-600 to-red-600",
    },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-base-content opacity-70 max-w-3xl mx-auto">
            Join thousands of successful students who found their perfect
            scholarship match
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-base-100 rounded-2xl p-8 shadow-2xl border border-base-300 text-center transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                className={`text-5xl md:text-6xl font-extrabold bg-linear-to-r ${stat.color} bg-clip-text text-transparent mb-4`}
              >
                {stat.number}
              </motion.div>
              <p className="text-lg font-semibold text-base-content opacity-80">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-base-content opacity-60 mb-6">
            Ready to become part of our success story?
          </p>
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 rounded-xl font-semibold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Get Started Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
