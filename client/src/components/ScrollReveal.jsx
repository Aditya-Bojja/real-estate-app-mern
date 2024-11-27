import { motion } from "motion/react";

const ScrollReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 100, y: 0 }}
      viewport={{ once: true }} //set this prop when you want the animation to happen only once
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
