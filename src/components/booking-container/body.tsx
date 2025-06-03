import { motion } from 'framer-motion';

const Body = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col bg-border/30 px-2 py-1.5 rounded-2xl"
    >
      {children}
    </motion.div>
  );
};

export default Body;