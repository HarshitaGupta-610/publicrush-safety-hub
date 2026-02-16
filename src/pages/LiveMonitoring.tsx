import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Users, Wifi, BarChart3, Eye } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const feeds = [
  { id: 1, name: "CAM-01: Main Gate", status: "Active" },
  { id: 2, name: "CAM-02: Stage Area", status: "Active" },
  { id: 3, name: "CAM-03: Food Court", status: "Active" },
  { id: 4, name: "CAM-04: Exit B", status: "Offline" },
];

const LiveMonitoring = () => {
  const [peopleCount, setPeopleCount] = useState(1247);

  useEffect(() => {
    const interval = setInterval(() => {
      setPeopleCount((prev) => prev + Math.floor(Math.random() * 21) - 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const overallStatus = peopleCount > 1400 ? "Critical" : peopleCount > 1200 ? "Warning" : "Safe";
  const statusColor = overallStatus === "Critical" ? "text-destructive" : overallStatus === "Warning" ? "text-warning" : "text-success";
  const statusGlow = overallStatus === "Critical" ? "danger" as const : overallStatus === "Warning" ? "warning" as const : "success" as const;

  return (
    <div className="container mx-auto px-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          <span className="gradient-primary-text">Live Monitoring</span>
        </h1>
        <p className="text-muted-foreground mt-1">Real-time CCTV analytics & crowd tracking</p>
      </div>

      {/* Status Bar */}
      <GlassCard glow={statusGlow}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Eye className={`w-8 h-8 ${statusColor}`} />
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">System Status</p>
              <p className={`text-2xl font-bold ${statusColor}`}>{overallStatus}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-foreground">{peopleCount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">People Detected</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-foreground">3/4</p>
              <p className="text-xs text-muted-foreground">Cams Online</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-success">98.7%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* CCTV Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {feeds.map((feed, i) => (
          <motion.div
            key={feed.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">{feed.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${feed.status === "Active" ? "bg-success animate-pulse" : "bg-destructive"}`} />
                  <span className={`text-xs font-mono ${feed.status === "Active" ? "text-success" : "text-destructive"}`}>{feed.status}</span>
                </div>
              </div>
              {/* Simulated Feed */}
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden dot-grid">
                <div className="scanline absolute inset-0" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {feed.status === "Offline" ? (
                    <div className="text-center">
                      <Wifi className="w-8 h-8 text-destructive mx-auto mb-2" />
                      <p className="text-xs text-destructive font-mono">SIGNAL LOST</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Users className="w-8 h-8 text-primary mx-auto mb-2 animate-pulse-glow" />
                      <p className="text-xs text-muted-foreground font-mono">LIVE FEED ACTIVE</p>
                      <p className="text-xs text-primary font-mono mt-1">
                        {Math.floor(Math.random() * 200 + 100)} detected
                      </p>
                    </div>
                  )}
                </div>
                {/* Overlay info */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground bg-background/50 px-2 py-0.5 rounded">
                    {new Date().toLocaleTimeString()}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground bg-background/50 px-2 py-0.5 rounded">
                    1080p • 30fps
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Avg. Dwell Time", value: "4.2m", icon: BarChart3 },
          { label: "Flow Rate", value: "23/min", icon: Users },
          { label: "Anomalies", value: "2", icon: Eye },
          { label: "Data Processed", value: "1.2TB", icon: Wifi },
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

export default LiveMonitoring;
