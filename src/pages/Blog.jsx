import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaCalendar,
  FaClock,
  FaUser,
  FaArrowRight,
  FaTag,
} from "react-icons/fa";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const categories = [
    "All",
    "Scholarship Tips",
    "Study Abroad",
    "Application Guide",
    "Success Stories",
    "Career Advice",
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Writing a Winning Scholarship Essay",
      excerpt:
        "Learn how to craft compelling scholarship essays that stand out from the competition and increase your chances of winning.",
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
      author: "Sarah Johnson",
      date: "January 10, 2026",
      readTime: "5 min read",
      category: "Scholarship Tips",
    },
    {
      id: 2,
      title: "Complete Guide to Studying in the United States",
      excerpt:
        "Everything you need to know about applying to US universities, from choosing schools to securing financial aid.",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      author: "Michael Chen",
      date: "January 8, 2026",
      readTime: "8 min read",
      category: "Study Abroad",
    },
    {
      id: 3,
      title: "How to Build a Strong Scholarship Application Portfolio",
      excerpt:
        "Discover the essential elements that make up a compelling scholarship application and how to present them effectively.",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
      author: "Emily Rodriguez",
      date: "January 5, 2026",
      readTime: "6 min read",
      category: "Application Guide",
    },
    {
      id: 4,
      title: "From Student to Scholar: My Journey to a Full Scholarship",
      excerpt:
        "A personal account of overcoming challenges and securing a full scholarship to study at a top university.",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
      author: "David Thompson",
      date: "January 3, 2026",
      readTime: "7 min read",
      category: "Success Stories",
    },
    {
      id: 5,
      title: "Understanding Different Types of Scholarships",
      excerpt:
        "A comprehensive breakdown of merit-based, need-based, and specialized scholarships to help you find the right fit.",
      image:
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
      author: "Lisa Anderson",
      date: "December 30, 2025",
      readTime: "5 min read",
      category: "Scholarship Tips",
    },
    {
      id: 6,
      title: "Career Planning: Maximizing Your Scholarship Experience",
      excerpt:
        "How to leverage your scholarship opportunities for long-term career success and professional networking.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      author: "James Wilson",
      date: "December 28, 2025",
      readTime: "6 min read",
      category: "Career Advice",
    },
    {
      id: 7,
      title: "Top Mistakes to Avoid in Scholarship Applications",
      excerpt:
        "Learn from common pitfalls that applicants face and how to sidestep them for a stronger application.",
      image:
        "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80",
      author: "Rachel Green",
      date: "December 25, 2025",
      readTime: "4 min read",
      category: "Application Guide",
    },
    {
      id: 8,
      title: "Studying in Europe: A Comprehensive Guide",
      excerpt:
        "Explore opportunities for international students in Europe, including scholarships, visa requirements, and cultural tips.",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      author: "Oliver Martinez",
      date: "December 22, 2025",
      readTime: "9 min read",
      category: "Study Abroad",
    },
    {
      id: 9,
      title: "How I Won 5 Scholarships in One Year",
      excerpt:
        "Strategies and techniques that helped one student secure multiple scholarships and fully fund their education.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
      author: "Sophia Lee",
      date: "December 20, 2025",
      readTime: "8 min read",
      category: "Success Stories",
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen blog-page-bg">
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
          className="absolute top-0 right-0 w-96 h-96 blog-blob rounded-full blur-3xl"
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
          className="absolute bottom-0 left-0 w-96 h-96 blog-blob-2 rounded-full blur-3xl"
        />

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
                ScholarStream Blog
              </h1>
              <p className="text-xl text-base-content opacity-70 max-w-3xl mx-auto">
                Expert insights, tips, and success stories to help you on your
                scholarship journey
              </p>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content opacity-40" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-base-100 border-2 border-base-300 text-base-content focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "bg-base-100 text-base-content border-2 border-base-300 hover:border-purple-500"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Featured Post */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-base-100 rounded-3xl overflow-hidden shadow-2xl border border-base-300 transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-bold shadow-lg">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4 hover:text-purple-600 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-base-content opacity-70 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-base-content opacity-60 mb-6">
                    <div className="flex items-center gap-2">
                      <FaUser />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendar />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-xl font-semibold bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 w-fit"
                  >
                    Read More
                    <FaArrowRight />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Blog Grid */}
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.slice(1).map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="bg-base-100 rounded-2xl overflow-hidden shadow-lg border border-base-300 transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                        <FaTag className="text-purple-600 text-xs" />
                        <span className="text-xs font-semibold text-gray-700">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-base-content mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-base-content opacity-70 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-base-content opacity-60 mb-4">
                      <div className="flex items-center gap-2">
                        <FaUser />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-base-content opacity-60">
                        {post.date}
                      </span>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="text-purple-600 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        Read More
                        <FaArrowRight />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* No Results Message */}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center blog-no-results">
                  <FaSearch className="text-4xl text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-base-content mb-2">
                  No Articles Found
                </h3>
                <p className="text-base-content opacity-60">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
