import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaReddit, FaYoutube, FaGoogle, FaStackOverflow } from "react-icons/fa";

export default function Bookmarks() {
  const bookmarks = [
    { name: "GitHub", url: "https://github.com", icon: <FaGithub /> },
    { name: "Twitter", url: "https://twitter.com", icon: <FaTwitter /> },
    { name: "Reddit", url: "https://reddit.com", icon: <FaReddit /> },
    { name: "YouTube", url: "https://youtube.com", icon: <FaYoutube /> },
    { name: "Google", url: "https://google.com", icon: <FaGoogle /> },
    { name: "Stack Overflow", url: "https://stackoverflow.com", icon: <FaStackOverflow /> },
  ];

  // Animation variants for the card
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  // Animation for the container (staggered children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of each child
      },
    },
  };

  return (
    <div className="glass p-6 rounded-lg">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {bookmarks.map((bookmark) => (
          <motion.a
            key={bookmark.name}
            href={bookmark.url}
            className="p-6 bg-ctp-surface0 hover:bg-ctp-surface1 rounded-lg text-ctp-text text-center transition-colors cursor-pointer border-2 border-ctp-overlay0 hover:border-ctp-overlay1"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <div className="flex flex-col items-center">
              {/* Icon */}
              <span className="text-4xl mb-4 text-ctp-mauve">{bookmark.icon}</span>
              {/* Bookmark Name */}
              <span className="text-lg font-semibold">{bookmark.name}</span>
              {/* Hostname */}
              <span className="text-sm text-ctp-subtext0">{new URL(bookmark.url).hostname}</span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
