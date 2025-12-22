import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-white text-gray-800 pt-24 lg:pt-32">
      <div className="absolute -top-0.5 left-0 right-0 h-0.5 bg-linear-to-r from-purple-500 via-pink-500 to-blue-500" />

      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative -mt-20 mb-12 lg:mb-16"
        >
          <div className="bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl shadow-2xl px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs sm:text-sm font-semibold tracking-wide text-purple-50 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Join ScholarStream today
              </p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
                Never miss a scholarship opportunity
              </h3>
              <p className="text-sm sm:text-base text-purple-100 max-w-xl">
                Get personalized alerts for new scholarships that match your
                profile and application timeline.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl text-sm sm:text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started Free
              </Link>
              <Link
                to="/scholarships"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/40 text-white rounded-xl text-sm sm:text-base hover:bg-white/10 transition-all duration-300"
              >
                Browse Scholarships
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-xl bg-linear-to-br from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                SS
              </div>
              <span className="text-xl font-extrabold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                ScholarStream
              </span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              Discover, track, and apply to global scholarships with a single
              unified platform tailored for ambitious students.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Follow us
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-200 transition-colors duration-200"
                >
                  <FaXTwitter className="text-lg" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-200 transition-colors duration-200"
                >
                  <FaFacebookF className="text-lg" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-200 transition-colors duration-200"
                >
                  <FaLinkedinIn className="text-lg" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-200 transition-colors duration-200"
                >
                  <FaInstagram className="text-lg" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/scholarships"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Browse Scholarships
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Universities
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Application Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Blog & Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-4">
              Stay updated
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Get weekly handpicked scholarships and application tips in your
              inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-400">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-xs font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-[11px] text-gray-500">
                By subscribing, you agree to our{" "}
                <Link
                  to="/terms"
                  className="underline underline-offset-2 text-purple-600 hover:text-purple-700"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="underline underline-offset-2 text-purple-600 hover:text-purple-700"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} ScholarStream. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="hover:text-gray-700 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
