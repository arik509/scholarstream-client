import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 flex items-center"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Toggle slider */}
      <motion.div
        className="w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: theme === "dark" ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {theme === "light" ? (
          <FiSun className="w-3 h-3 text-yellow-500" />
        ) : (
          <FiMoon className="w-3 h-3 text-purple-500" />
        )}
      </motion.div>

      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <FiSun
          className={`w-3 h-3 transition-opacity ${
            theme === "light" ? "opacity-0" : "opacity-50 text-yellow-400"
          }`}
        />
        <FiMoon
          className={`w-3 h-3 transition-opacity ${
            theme === "dark" ? "opacity-0" : "opacity-50 text-gray-400"
          }`}
        />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
