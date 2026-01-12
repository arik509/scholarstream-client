import { motion } from "framer-motion";
import { FaGraduationCap, FaFileAlt, FaCalendarCheck, FaHandshake, FaLightbulb, FaAward } from "react-icons/fa";

const Services = () => {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const services = [
    {
      icon: FaGraduationCap,
      title: "Scholarship Discovery",
      description: "Browse through thousands of scholarships tailored to your academic background, interests, and financial needs.",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80"
    },
    {
      icon: FaFileAlt,
      title: "Application Management",
      description: "Organize and manage all your scholarship applications in one place with document storage and tracking.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80"
    },
    {
      icon: FaCalendarCheck,
      title: "Deadline Reminders",
      description: "Never miss a deadline with automated reminders and calendar integration for all your applications.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80"
    },
    {
      icon: FaHandshake,
      title: "Direct Connect",
      description: "Connect directly with scholarship providers and universities for questions and application support.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80"
    },
    {
      icon: FaLightbulb,
      title: "Expert Guidance",
      description: "Access tips, resources, and expert advice to strengthen your scholarship applications and essays.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80"
    },
    {
      icon: FaAward,
      title: "Success Tracking",
      description: "Track your scholarship wins, rejections, and pending applications with detailed analytics and insights.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80"
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
            Our Services
          </h2>
          <p className="text-xl text-base-content opacity-70 max-w-3xl mx-auto">
            Comprehensive tools and support for every step of your scholarship journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center bg-base-100 rounded-2xl overflow-hidden shadow-xl border border-base-300`}
            >
              <div className="lg:w-1/2 h-64 lg:h-80 overflow-hidden bg-base-300">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/600x400/9333ea/ffffff?text=${encodeURIComponent(service.title)}`;
                  }}
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <service.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-base-content">{service.title}</h3>
                </div>
                <p className="text-base-content opacity-70 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
