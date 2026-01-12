import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaUsers,
  FaGlobe,
  FaAward,
  FaRocket,
  FaHeart,
  FaCheckCircle,
  FaBullseye,
} from "react-icons/fa";
import { MdSchool, MdSecurity, MdSpeed } from "react-icons/md";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const stats = [
    { icon: FaGraduationCap, number: "1000+", label: "Scholarships" },
    { icon: FaUsers, number: "50K+", label: "Students Helped" },
    { icon: FaGlobe, number: "150+", label: "Countries" },
    { icon: FaAward, number: "$50M+", label: "Awarded Funding" },
  ];

  const features = [
    {
      icon: MdSchool,
      title: "Comprehensive Database",
      description:
        "Access thousands of scholarships from universities worldwide, all in one place.",
    },
    {
      icon: MdSpeed,
      title: "Easy Application",
      description:
        "Streamlined application process with real-time status tracking and updates.",
    },
    {
      icon: MdSecurity,
      title: "Secure Platform",
      description:
        "Your data is protected with industry-standard security measures.",
    },
    {
      icon: FaHeart,
      title: "Personalized Matching",
      description:
        "Find scholarships that match your profile, goals, and academic background.",
    },
  ];

  const values = [
    {
      icon: FaBullseye,
      title: "Our Mission",
      description:
        "To make quality education accessible to everyone by connecting students with scholarship opportunities worldwide.",
    },
    {
      icon: FaCheckCircle,
      title: "Our Vision",
      description:
        "A world where financial barriers never prevent talented students from achieving their educational dreams.",
    },
  ];

  return (
    <div className="min-h-screen about-page-bg">
      <div className="relative overflow-hidden">
        {/* Animated Background Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-96 h-96 about-blob rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 left-0 w-96 h-96 about-blob-2 rounded-full blur-3xl"
        />

        {/* Main Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-20"
          >
            {/* Hero Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full about-icon-bg mb-6">
                <FaGraduationCap className="text-4xl text-purple-600" />
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
                About ScholarStream
              </h1>
              <p className="text-xl text-base-content opacity-70 max-w-3xl mx-auto leading-relaxed">
                Empowering students worldwide to achieve their academic dreams
                through accessible scholarship opportunities.
              </p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="bg-base-100 rounded-2xl p-6 text-center shadow-lg border border-base-300 transition-colors duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full stat-icon-bg mb-4">
                    <stat.icon className="text-3xl text-purple-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-base-content mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-base-content opacity-60 font-semibold">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Mission & Vision Section */}
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-2 gap-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="bg-base-100 rounded-2xl p-8 shadow-xl border border-base-300 transition-colors duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full value-icon-bg mb-6">
                    <value.icon className="text-3xl text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-base-content mb-4">
                    {value.title}
                  </h3>
                  <p className="text-base-content opacity-70 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Story Section */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-base-100 rounded-2xl p-8 md:p-12 shadow-2xl border border-base-300 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <FaRocket className="text-3xl text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-base-content">
                  Our Story
                </h2>
              </div>
              <div className="space-y-4 text-base-content opacity-80 leading-relaxed">
                <p>
                  ScholarStream was founded with a simple yet powerful vision:
                  to break down financial barriers that prevent talented
                  students from accessing quality education. We recognized that
                  countless deserving students around the world were missing out
                  on opportunities simply because they didn't know where to
                  look.
                </p>
                <p>
                  In 2020, a small team of educators and tech enthusiasts came
                  together to create a platform that would revolutionize how
                  students discover and apply for scholarships. What started as
                  a simple database has evolved into a comprehensive ecosystem
                  that supports students throughout their entire scholarship
                  journey.
                </p>
                <p>
                  Today, ScholarStream connects thousands of students with
                  life-changing opportunities every month. We've helped students
                  from over 150 countries secure funding for their education,
                  totaling over $50 million in awarded scholarships. But we're
                  not stopping there – our mission continues to grow as we
                  expand our reach and improve our platform.
                </p>
              </div>
            </motion.div>

            {/* Features Section */}
            <div>
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                  Why Choose ScholarStream?
                </h2>
                <p className="text-xl text-base-content opacity-70 max-w-2xl mx-auto">
                  We provide the tools and resources you need to succeed in your
                  scholarship search.
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid md:grid-cols-2 gap-8"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl feature-icon-bg flex items-center justify-center">
                        <feature.icon className="text-2xl text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-base-content mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-base-content opacity-70 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have found their perfect
                scholarship match with ScholarStream.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/scholarships"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl font-semibold bg-white text-purple-600 shadow-lg hover:shadow-2xl transition-all"
                >
                  Browse Scholarships
                </motion.a>
                <motion.a
                  href="/register"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl font-semibold border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all"
                >
                  Create Account
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
