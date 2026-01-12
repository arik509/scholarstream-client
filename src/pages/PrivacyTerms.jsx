import { useState } from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaFileContract, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { MdSecurity, MdGavel } from "react-icons/md";

const PrivacyTerms = () => {
  const [activeTab, setActiveTab] = useState("privacy");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen privacy-page-bg">
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
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-96 h-96 privacy-blob rounded-full blur-3xl"
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
            delay: 2
          }}
          className="absolute bottom-0 left-0 w-96 h-96 privacy-blob-2 rounded-full blur-3xl"
        />

        {/* Main Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full privacy-icon-bg mb-6">
                <FaShieldAlt className="text-4xl text-purple-600" />
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Privacy & Terms
              </h1>
              <p className="text-xl text-base-content opacity-70 max-w-3xl mx-auto">
                Your privacy and security are our top priorities
              </p>
              <p className="text-sm text-base-content opacity-50 mt-4">
                Last Updated: January 12, 2026
              </p>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div variants={itemVariants} className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("privacy")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "privacy"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-base-100 text-base-content border-2 border-base-300 hover:border-purple-500"
                }`}
              >
                <FaLock />
                Privacy Policy
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("terms")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "terms"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-base-100 text-base-content border-2 border-base-300 hover:border-purple-500"
                }`}
              >
                <FaFileContract />
                Terms of Service
              </motion.button>
            </motion.div>

            {/* Content Section */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-base-100 rounded-2xl p-8 md:p-12 shadow-2xl border border-base-300 transition-colors duration-300"
            >
              {activeTab === "privacy" ? (
                <div className="space-y-8">
                  {/* Privacy Policy Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <MdSecurity className="text-2xl text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-base-content">Privacy Policy</h2>
                    </div>
                    <p className="text-base-content opacity-70 leading-relaxed">
                      At ScholarStream, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our platform.
                    </p>
                  </div>

                  {/* Information We Collect */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      Information We Collect
                    </h3>
                    <div className="bg-base-200 rounded-xl p-6 space-y-4">
                      <div>
                        <h4 className="font-bold text-base-content mb-2">Personal Information</h4>
                        <ul className="list-disc list-inside text-base-content opacity-70 space-y-2 ml-4">
                          <li>Name, email address, and contact information</li>
                          <li>Educational background and academic records</li>
                          <li>Financial information for scholarship applications</li>
                          <li>Profile photo and biographical information</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-base-content mb-2">Usage Information</h4>
                        <ul className="list-disc list-inside text-base-content opacity-70 space-y-2 ml-4">
                          <li>Browser type, device information, and IP address</li>
                          <li>Pages visited and features used on our platform</li>
                          <li>Time and date of access</li>
                          <li>Cookies and similar tracking technologies</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* How We Use Your Information */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      How We Use Your Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 bg-base-200 rounded-xl p-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-base-content mb-1">To Provide Our Services</h4>
                          <p className="text-base-content opacity-70 text-sm">
                            Process scholarship applications, match you with opportunities, and manage your account.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-base-200 rounded-xl p-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-base-content mb-1">To Improve User Experience</h4>
                          <p className="text-base-content opacity-70 text-sm">
                            Analyze usage patterns to enhance our platform, develop new features, and personalize your experience.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-base-200 rounded-xl p-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-base-content mb-1">To Communicate With You</h4>
                          <p className="text-base-content opacity-70 text-sm">
                            Send important updates, scholarship notifications, and respond to your inquiries.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-base-200 rounded-xl p-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-sm">4</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-base-content mb-1">For Security and Fraud Prevention</h4>
                          <p className="text-base-content opacity-70 text-sm">
                            Protect against unauthorized access, ensure platform security, and prevent fraudulent activities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Protection */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
                      <FaLock className="text-purple-600" />
                      Data Protection & Security
                    </h3>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                      <p className="text-base-content opacity-80 leading-relaxed mb-4">
                        We implement industry-standard security measures to protect your personal information, including:
                      </p>
                      <ul className="space-y-2 text-base-content opacity-70">
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>SSL encryption for data transmission</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Regular security audits and vulnerability assessments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Secure data storage with access controls</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Employee training on data protection practices</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Your Rights */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      Your Rights
                    </h3>
                    <div className="bg-base-200 rounded-xl p-6">
                      <p className="text-base-content opacity-70 leading-relaxed mb-4">
                        You have the right to:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-base-content opacity-80">Access your personal data</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-base-content opacity-80">Correct inaccurate information</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-base-content opacity-80">Request data deletion</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-base-content opacity-80">Opt-out of marketing communications</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-base-content opacity-80">Export your data</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-base-content opacity-80">Withdraw consent</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="text-xl font-bold text-base-content mb-3">Questions About Privacy?</h3>
                    <p className="text-base-content opacity-70 mb-4">
                      If you have any questions or concerns about our Privacy Policy, please contact us at:
                    </p>
                    <p className="text-base-content font-semibold">privacy@scholarstream.com</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Terms of Service Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <MdGavel className="text-2xl text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-base-content">Terms of Service</h2>
                    </div>
                    <p className="text-base-content opacity-70 leading-relaxed">
                      These Terms of Service govern your use of ScholarStream and the services we provide. By accessing or using our platform, you agree to be bound by these terms.
                    </p>
                  </div>

                  {/* Acceptance of Terms */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      Acceptance of Terms
                    </h3>
                    <div className="bg-base-200 rounded-xl p-6">
                      <p className="text-base-content opacity-70 leading-relaxed">
                        By creating an account and using ScholarStream, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                      </p>
                    </div>
                  </div>

                  {/* User Responsibilities */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
                      <FaExclamationTriangle className="text-yellow-500" />
                      User Responsibilities
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-base-200 rounded-xl p-4">
                        <h4 className="font-bold text-base-content mb-2">Account Security</h4>
                        <p className="text-base-content opacity-70 text-sm">
                          You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                        </p>
                      </div>
                      <div className="bg-base-200 rounded-xl p-4">
                        <h4 className="font-bold text-base-content mb-2">Accurate Information</h4>
                        <p className="text-base-content opacity-70 text-sm">
                          You must provide accurate, current, and complete information during registration and keep your profile information up to date.
                        </p>
                      </div>
                      <div className="bg-base-200 rounded-xl p-4">
                        <h4 className="font-bold text-base-content mb-2">Prohibited Activities</h4>
                        <p className="text-base-content opacity-70 text-sm">
                          You may not use our platform for illegal purposes, to harass others, to submit fraudulent applications, or to violate any applicable laws or regulations.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Service Description */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      Our Services
                    </h3>
                    <div className="bg-base-200 rounded-xl p-6 space-y-4">
                      <p className="text-base-content opacity-70 leading-relaxed">
                        ScholarStream provides the following services:
                      </p>
                      <ul className="list-disc list-inside text-base-content opacity-70 space-y-2 ml-4">
                        <li>Scholarship database and search functionality</li>
                        <li>Application management and tracking</li>
                        <li>User profiles and account management</li>
                        <li>Educational resources and guidance</li>
                        <li>Communication between students and scholarship providers</li>
                      </ul>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
                        <p className="text-base-content opacity-80 text-sm">
                          <strong>Note:</strong> We facilitate connections between students and scholarship opportunities but do not guarantee scholarship awards or acceptance.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Intellectual Property */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
                      <FaLock className="text-purple-600" />
                      Intellectual Property
                    </h3>
                    <div className="bg-base-200 rounded-xl p-6">
                      <p className="text-base-content opacity-70 leading-relaxed">
                        All content on ScholarStream, including text, graphics, logos, images, and software, is the property of ScholarStream or its content suppliers and is protected by international copyright laws. You may not copy, modify, distribute, or reproduce any content without our express written permission.
                      </p>
                    </div>
                  </div>

                  {/* Limitation of Liability */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
                      <FaExclamationTriangle className="text-yellow-500" />
                      Limitation of Liability
                    </h3>
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                      <p className="text-base-content opacity-80 leading-relaxed mb-4">
                        ScholarStream is provided "as is" without warranties of any kind. We are not liable for:
                      </p>
                      <ul className="space-y-2 text-base-content opacity-70">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Scholarship application outcomes or decisions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Accuracy of information provided by third parties</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Service interruptions or technical issues</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Loss of data or unauthorized access to your account</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Termination */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
                      <FaExclamationTriangle className="text-yellow-500" />
                      Account Termination
                    </h3>
                    <div className="bg-base-200 rounded-xl p-6">
                      <p className="text-base-content opacity-70 leading-relaxed">
                        We reserve the right to suspend or terminate your account at any time for violation of these Terms of Service or for any other reason we deem necessary. You may also terminate your account at any time by contacting us or using the account deletion feature in your settings.
                      </p>
                    </div>
                  </div>

                  {/* Changes to Terms */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      Changes to These Terms
                    </h3>
                    <div className="bg-base-200 rounded-xl p-6">
                      <p className="text-base-content opacity-70 leading-relaxed">
                        We may update these Terms of Service from time to time. We will notify you of any changes by posting the new terms on this page and updating the "Last Updated" date. Your continued use of ScholarStream after changes are posted constitutes your acceptance of the revised terms.
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                    <h3 className="text-xl font-bold text-base-content mb-3">Questions About Our Terms?</h3>
                    <p className="text-base-content opacity-70 mb-4">
                      If you have any questions about these Terms of Service, please contact us at:
                    </p>
                    <p className="text-base-content font-semibold">legal@scholarstream.com</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTerms;
