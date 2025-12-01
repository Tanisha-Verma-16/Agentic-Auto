import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Battery, Zap, Gauge, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import generatedImage from "@assets/image_1764602623525.png";

interface DigitalTwinProps {
  isSimulationRunning: boolean;
  step: number;
}

export function DigitalTwin({ isSimulationRunning, step }: DigitalTwinProps) {
  // Mock sensor data
  const [rpm, setRpm] = useState(800);
  const [speed, setSpeed] = useState(0);
  const [voltage, setVoltage] = useState(13.8);
  const [temp, setTemp] = useState(90);

  useEffect(() => {
    const interval = setInterval(() => {
      setRpm(prev => Math.max(750, Math.min(3000, prev + (Math.random() * 100 - 50))));
      setSpeed(prev => Math.max(0, Math.min(120, prev + (Math.random() * 5 - 2.5))));
      setTemp(prev => Math.max(85, Math.min(95, prev + (Math.random() * 2 - 1))));

      if (isSimulationRunning && step >= 1) {
        // Simulate failure
        setVoltage(prev => Math.max(11.2, Math.min(12.5, prev + (Math.random() * 1 - 0.5))));
      } else {
        // Normal range
        setVoltage(prev => Math.max(13.5, Math.min(14.2, prev + (Math.random() * 0.2 - 0.1))));
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isSimulationRunning, step]);

  const isFailing = step >= 1 && isSimulationRunning;

  return (
    <Card className="glass-panel h-full overflow-hidden p-6 relative flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-20" />
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl text-white flex items-center gap-2">
          <Activity className="text-neon-cyan" />
          DIGITAL TWIN
        </h2>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isSimulationRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
          <span className="text-xs font-mono text-muted-foreground">LIVE FEED</span>
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center min-h-[300px]">
        {/* Car Visualization */}
        <div className="relative w-full max-w-md aspect-video">
          <img 
            src={generatedImage} 
            alt="Vehicle Digital Twin" 
            className="w-full h-full object-contain opacity-80 mix-blend-screen"
          />
          
          {/* Failure Indicator Overlay */}
          <AnimatePresence>
            {isFailing && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-red-500/50" />
                  <div className="h-16 w-16 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center backdrop-blur-sm">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <div className="mt-2 px-3 py-1 bg-red-950/80 border border-red-500 text-red-500 text-xs font-mono rounded animate-pulse">
                  ALTERNATOR FAULT
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Connection lines or HUD elements could go here */}
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <SensorCard 
          label="BATTERY VOLTAGE" 
          value={`${voltage.toFixed(1)}V`} 
          icon={Battery} 
          status={isFailing ? "critical" : "normal"}
        />
        <SensorCard 
          label="ENGINE RPM" 
          value={Math.round(rpm).toString()} 
          icon={Gauge} 
          status="normal"
        />
        <SensorCard 
          label="SPEED" 
          value={`${Math.round(speed)} KM/H`} 
          icon={Zap} 
          status="normal"
        />
        <SensorCard 
          label="ENGINE TEMP" 
          value={`${Math.round(temp)}°C`} 
          icon={Activity} 
          status="normal"
        />
      </div>
    </Card>
  );
}

function SensorCard({ label, value, icon: Icon, status }: { label: string, value: string, icon: any, status: "normal" | "critical" }) {
  return (
    <div className={`p-3 rounded border bg-black/40 backdrop-blur transition-colors duration-500 ${
      status === "critical" ? "border-red-500/50 bg-red-950/20" : "border-white/5"
    }`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-mono text-muted-foreground">{label}</span>
        <Icon className={`h-3 w-3 ${status === "critical" ? "text-red-500" : "text-neon-cyan"}`} />
      </div>
      <div className={`text-xl font-display font-bold tracking-wider ${
        status === "critical" ? "text-red-500 animate-pulse" : "text-white"
      }`}>
        {value}
      </div>
    </div>
  );
}
