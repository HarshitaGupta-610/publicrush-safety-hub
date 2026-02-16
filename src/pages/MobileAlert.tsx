import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Navigation, Shield, AlertTriangle, ArrowUp } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const MobileAlert = () => {
  const [alertTriggered, setAlertTriggered] = useState(false);

  return (
    <div className="container mx-auto px-4 space-y-6 max-w-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          <span className="gradient-primary-text">Mobile Alert</span>
        </h1>
        <p className="text-muted-foreground mt-1">Emergency notification demo</p>
      </div>

      {/* Phone Mockup */}
      <div className="mx-auto max-w-sm">
        <div className="glass rounded-[2rem] p-2 glow-primary">
          <div className="bg-background rounded-[1.5rem] overflow-hidden min-h-[500px] relative">
            {/* Status Bar */}
            <div className="flex items-center justify-between px-6 py-3 text-xs font-mono text-muted-foreground">
              <span>9:41</span>
              <div className="w-20 h-5 bg-muted rounded-full" />
              <span>100%</span>
            </div>

            <div className="px-6 pb-6 space-y-6">
              {/* Normal State */}
              <AnimatePresence mode="wait">
                {!alertTriggered ? (
                  <motion.div
                    key="normal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 pt-4"
                  >
                    <div className="text-center">
                      <Shield className="w-16 h-16 text-success mx-auto mb-3" />
                      <p className="text-lg font-bold text-success">All Clear</p>
                      <p className="text-sm text-muted-foreground">No active alerts in your area</p>
                    </div>

                    <div className="glass rounded-xl p-4 space-y-3">
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Your Zone</p>
                      <p className="text-sm font-semibold text-foreground">Food Court — Section B</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-xs text-success">Safe Zone</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setAlertTriggered(true)}
                      className="w-full gradient-primary text-primary-foreground font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] glow-primary"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Bell className="w-5 h-5" />
                        Trigger Emergency Demo
                      </div>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="alert"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5 pt-4"
                  >
                    {/* Notification */}
                    <motion.div
                      initial={{ y: -30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 glow-danger"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 animate-pulse" />
                        <div>
                          <p className="text-sm font-bold text-destructive">🚨 EMERGENCY ALERT</p>
                          <p className="text-xs text-foreground mt-1">
                            High Crowd Density Detected — Proceed to Nearest Safe Exit.
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-1 font-mono">Just now • PublicRush</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Navigation Arrow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-center space-y-3"
                    >
                      <p className="text-xs font-mono text-muted-foreground uppercase">Navigate to Safe Zone</p>
                      <div className="relative w-24 h-24 mx-auto">
                        <motion.div
                          animate={{ y: [-4, 4, -4] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center glow-primary"
                        >
                          <ArrowUp className="w-12 h-12 text-primary-foreground -rotate-45" />
                        </motion.div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Exit B — Gate 3</p>
                        <p className="text-xs text-muted-foreground">120m ahead • ~2 min walk</p>
                      </div>
                    </motion.div>

                    {/* Safe Zone Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="glass rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Navigation className="w-4 h-4 text-success" />
                        <p className="text-xs font-mono text-success uppercase">Safe Zone Details</p>
                      </div>
                      <p className="text-sm text-foreground">Open field near Parking Lot C</p>
                      <p className="text-xs text-muted-foreground mt-1">Capacity: Available • Crowd: Low</p>
                    </motion.div>

                    <button
                      onClick={() => setAlertTriggered(false)}
                      className="w-full border border-border text-muted-foreground font-medium py-3 rounded-xl transition-all hover:bg-muted hover:text-foreground"
                    >
                      Reset Demo
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAlert;
