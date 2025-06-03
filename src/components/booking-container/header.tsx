import { motion } from 'framer-motion';

const Header = ({ children }) => {
  return (
    <motion.div
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="px-4 flex justify-between items-center flex-row-reverse bg-border rounded-2xl py-2.5"
    >
      {children}
    </motion.div>
  );
};

export default Header;