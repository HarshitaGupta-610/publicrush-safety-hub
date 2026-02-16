import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Users, Activity, MapPin, Shield, TrendingUp } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const riskLevels = ["Low", "Medium", "High"] as const;
const riskColors = { Low: "text-success", Medium: "text-warning", High: "text-destructive" };
const riskGlows = { Low: "success" as const, Medium: "warning" as const, High: "danger" as const };

const zones = [
  { name: "Main Gate", density: 72, status: "Warning" },
  { name: "Food Court", density: 45, status: "Safe" },
  { name: "Stage Area", density: 91, status: "Critical" },
  { name: "Parking Lot", density: 28, status: "Safe" },
  { name: "Exit B", density: 65, status: "Warning" },
  { name: "VIP Section", density: 38, status: "Safe" },
];

const Dashboard = () => {
  const [crowdLevel, setCrowdLevel] = useState(67);
  const [riskIndex, setRiskIndex] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCrowdLevel((prev) => {
        const next = prev + Math.floor(Math.random() * 11) - 5;
        const clamped = Math.max(10, Math.min(100, next));
        if (clamped > 80) {
          setRiskIndex(2);
          setShowAlert(true);
        } else if (clamped > 50) {
          setRiskIndex(1);
          setShowAlert(false);
        } else {
          setRiskIndex(0);
          setShowAlert(false);
        }
        return clamped;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const risk = riskLevels[riskIndex];

  return (
    <div className="container mx-auto px-4 space-y-6">
      {/* Alert Banner */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="gradient-primary glow-danger rounded-xl p-4 flex items-center gap-3"
          >
            <AlertTriangle className="w-6 h-6 text-primary-foreground animate-pulse" />
            <div>
              <p className="font-bold text-primary-foreground">⚠️ HIGH CROWD DENSITY DETECTED</p>
              <p className="text-sm text-primary-foreground/80">Stage Area exceeding safe capacity — deploy crowd control team</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          <span className="gradient-primary-text">Command Center</span>
        </h1>
        <p className="text-muted-foreground mt-1">Real-time crowd intelligence & risk assessment</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard glow={riskGlows[risk]}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Crowd Density</p>
              <p className={`text-4xl font-bold mt-1 ${riskColors[risk]}`}>{crowdLevel}%</p>
            </div>
            <Users className={`w-10 h-10 ${riskColors[risk]} opacity-60`} />
          </div>
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${risk === "High" ? "bg-destructive" : risk === "Medium" ? "bg-warning" : "bg-success"}`}
              animate={{ width: `${crowdLevel}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className={`text-sm font-semibold mt-2 ${riskColors[risk]}`}>
            {risk} Density
          </p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Risk Score</p>
              <p className="text-4xl font-bold mt-1 text-foreground">{(crowdLevel * 0.85).toFixed(0)}<span className="text-lg text-muted-foreground">/100</span></p>
            </div>
            <Activity className="w-10 h-10 text-primary opacity-60" />
          </div>
          <div className="mt-4 flex gap-1">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full ${i < Math.floor(crowdLevel * 0.085) ? "gradient-primary" : "bg-muted"}`} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">AI-Predicted Threat Level</p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Active Zones</p>
              <p className="text-4xl font-bold mt-1 text-foreground">6</p>
            </div>
            <MapPin className="w-10 h-10 text-secondary opacity-60" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-sm text-success">4 Safe</span>
            <AlertTriangle className="w-4 h-4 text-warning ml-2" />
            <span className="text-sm text-warning">1 Warning</span>
            <AlertTriangle className="w-4 h-4 text-destructive ml-2" />
            <span className="text-sm text-destructive">1 Critical</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Monitored Perimeters</p>
        </GlassCard>
      </div>

      {/* Danger Zones Map */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Zone Activity Map</h2>
          <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> LIVE
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {zones.map((zone) => {
            const s = zone.status;
            const color = s === "Critical" ? "border-destructive/50 bg-destructive/5" : s === "Warning" ? "border-warning/50 bg-warning/5" : "border-success/30 bg-success/5";
            const textColor = s === "Critical" ? "text-destructive" : s === "Warning" ? "text-warning" : "text-success";
            return (
              <div key={zone.name} className={`rounded-lg border p-4 ${color} transition-all hover:scale-[1.02]`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{zone.name}</span>
                  <span className={`text-xs font-mono font-bold ${textColor}`}>{zone.status}</span>
                </div>
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s === "Critical" ? "bg-destructive" : s === "Warning" ? "bg-warning" : "bg-success"}`}
                    style={{ width: `${zone.density}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{zone.density}% capacity</p>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Activity Feed */}
      <GlassCard>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" /> Recent Activity
        </h2>
        <div className="space-y-3">
          {[
            { time: "2 min ago", msg: "Crowd density spike detected at Stage Area", type: "destructive" },
            { time: "5 min ago", msg: "Exit B cleared — density reduced to safe levels", type: "success" },
            { time: "12 min ago", msg: "Warning issued for Main Gate zone", type: "warning" },
            { time: "18 min ago", msg: "System scan completed — all sensors operational", type: "muted" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <div className={`w-2 h-2 rounded-full mt-1.5 ${
                item.type === "destructive" ? "bg-destructive" : item.type === "success" ? "bg-success" : item.type === "warning" ? "bg-warning" : "bg-muted-foreground"
              }`} />
              <div>
                <p className="text-sm text-foreground">{item.msg}</p>
                <p className="text-xs text-muted-foreground font-mono">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
