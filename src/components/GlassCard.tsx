import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: "primary" | "danger" | "success" | "warning" | "none";
}

const glowMap = {
  primary: "glow-primary",
  danger: "glow-danger",
  success: "glow-success",
  warning: "glow-warning",
  none: "",
};

const GlassCard = ({ children, className = "", glow = "none" }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`glass rounded-xl p-6 ${glowMap[glow]} ${className}`}
  >
    {children}
  </motion.div>
);

export default GlassCard;
