import { useState } from "react";
import { motion } from "framer-motion";
import { Siren, FileText, MapPin, Clock, AlertTriangle, Shield, Volume2 } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { toast } from "sonner";

const alertLogs = [
  { id: 1, time: "14:32:05", zone: "Stage Area", type: "Critical", msg: "Crowd exceeds 90% capacity" },
  { id: 2, time: "14:28:41", zone: "Main Gate", type: "Warning", msg: "Unusual movement pattern detected" },
  { id: 3, time: "14:15:22", zone: "Exit B", type: "Warning", msg: "Bottleneck forming at chokepoint" },
  { id: 4, time: "14:02:10", zone: "Food Court", type: "Info", msg: "Density normalized after intervention" },
  { id: 5, time: "13:55:33", zone: "VIP Section", type: "Info", msg: "Routine scan completed — all clear" },
  { id: 6, time: "13:41:08", zone: "Parking Lot", type: "Warning", msg: "Vehicle congestion increasing" },
];

const heatmapZones = [
  { name: "Stage", x: "20%", y: "25%", intensity: 0.9 },
  { name: "Gate", x: "70%", y: "20%", intensity: 0.65 },
  { name: "Food", x: "45%", y: "55%", intensity: 0.4 },
  { name: "Exit B", x: "80%", y: "70%", intensity: 0.6 },
  { name: "VIP", x: "30%", y: "75%", intensity: 0.3 },
  { name: "Parking", x: "60%", y: "85%", intensity: 0.25 },
];

const AuthoritiesPanel = () => {
  const [alarmActive, setAlarmActive] = useState(false);

  const triggerAlarm = () => {
    setAlarmActive(true);
    toast.error("🚨 EMERGENCY ALARM ACTIVATED — All units notified", {
      duration: 5000,
    });
    setTimeout(() => setAlarmActive(false), 5000);
  };

  return (
    <div className="container mx-auto px-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-primary-text">Authorities Panel</span>
          </h1>
          <p className="text-muted-foreground mt-1">Command & control for emergency response</p>
        </div>
        <motion.button
          onClick={triggerAlarm}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-destructive-foreground transition-all ${
            alarmActive
              ? "bg-destructive glow-danger animate-pulse"
              : "bg-destructive hover:bg-destructive/90 glow-danger"
          }`}
        >
          <Siren className="w-5 h-5" />
          {alarmActive ? "ALARM ACTIVE" : "EMERGENCY ALARM"}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Logs */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Alert Logs</h2>
          </div>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {alertLogs.map((log, i) => {
              const typeColor = log.type === "Critical" ? "text-destructive" : log.type === "Warning" ? "text-warning" : "text-muted-foreground";
              const typeBg = log.type === "Critical" ? "bg-destructive/10 border-destructive/20" : log.type === "Warning" ? "bg-warning/10 border-warning/20" : "bg-muted/30 border-border";
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-lg border p-3 ${typeBg}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono font-bold ${typeColor}`}>{log.type.toUpperCase()}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {log.zone}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {log.time}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{log.msg}</p>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Heatmap Mockup */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Crowd Heatmap</h2>
          </div>
          <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden dot-grid">
            {/* Grid overlay */}
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(hsl(230 20% 20% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(230 20% 20% / 0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
            
            {/* Heatmap spots */}
            {heatmapZones.map((zone) => {
              const r = zone.intensity > 0.7 ? "bg-destructive" : zone.intensity > 0.5 ? "bg-warning" : "bg-success";
              const size = 40 + zone.intensity * 60;
              return (
                <motion.div
                  key={zone.name}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute flex flex-col items-center"
                  style={{ left: zone.x, top: zone.y, transform: "translate(-50%, -50%)" }}
                >
                  <div
                    className={`${r} rounded-full opacity-40 animate-pulse-glow`}
                    style={{ width: size, height: size, filter: "blur(8px)" }}
                  />
                  <span className="absolute text-[10px] font-mono text-foreground font-bold whitespace-nowrap"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  >
                    {zone.name}
                  </span>
                </motion.div>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-3 right-3 glass rounded-lg p-2 text-[10px] font-mono space-y-1">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-destructive" /> High</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-warning" /> Medium</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success" /> Low</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Units Deployed", value: "12", icon: Shield },
          { label: "Alerts Today", value: "8", icon: AlertTriangle },
          { label: "Response Time", value: "2.3m", icon: Clock },
          { label: "PA Broadcasts", value: "3", icon: Volume2 },
        ].map((stat, i) => (
          <GlassCard key={i}>
            <stat.icon className="w-5 h-5 text-primary mb-2" />
            <p className="text-2xl font-bold font-mono text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default AuthoritiesPanel;
