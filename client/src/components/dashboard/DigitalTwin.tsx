import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Battery, Zap, Gauge, AlertTriangle, HeartPulse } from "lucide-react";
import { Card } from "@/components/ui/card";
import generatedImage from "@assets/Gemini_Generated_Image_8vzxws8vzxws8vzx_1764603329415.png";

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
      
      <div className="flex items-center justify-between mb-4 z-10 relative">
        <h2 className="font-display text-xl text-white flex items-center gap-2">
          <Activity className="text-neon-cyan" />
          DIGITAL TWIN
        </h2>
        
        {/* Health Status Icon */}
         <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 ${
           isFailing 
             ? "bg-red-950/50 border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(255,0,0,0.3)]" 
             : "bg-neon-green/10 border-neon-green/30 text-neon-green shadow-[0_0_10px_rgba(0,255,0,0.1)]"
         }`}>
           <HeartPulse className={`h-4 w-4 ${isFailing ? "animate-pulse" : ""}`} />
           <span className="text-xs font-mono font-bold tracking-wider">
             {isFailing ? "CRITICAL" : "HEALTHY"}
           </span>
         </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center min-h-0 -mx-6 -my-2">
        {/* Car Visualization */}
        <div className="relative w-full h-full">
          <img 
            src={generatedImage} 
            alt="Vehicle Digital Twin" 
            className="w-full h-full object-cover opacity-90 mix-blend-screen" 
          />
          
          {/* Overlay gradient to blend edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          
          {/* Failure Indicator Overlay */}
          <AnimatePresence>
            {isFailing && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20"
              >
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-red-500/50" />
                  <div className="h-20 w-20 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(255,0,0,0.4)]">
                    <AlertTriangle className="h-10 w-10 text-red-500" />
                  </div>
                </div>
                <div className="mt-4 px-4 py-2 bg-red-950/90 border border-red-500 text-red-500 text-sm font-display font-bold tracking-widest rounded shadow-lg animate-pulse">
                  ALTERNATOR FAULT DETECTED
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sensor Grid - Positioned at bottom over the image gradient */}
      <div className="grid grid-cols-4 gap-2 mt-4 z-10 relative">
        <SensorCard 
          label="VOLTAGE" 
          value={`${voltage.toFixed(1)}V`} 
          icon={Battery} 
          status={isFailing ? "critical" : "normal"}
        />
        <SensorCard 
          label="RPM" 
          value={Math.round(rpm).toString()} 
          icon={Gauge} 
          status="normal"
        />
        <SensorCard 
          label="SPEED" 
          value={`${Math.round(speed)}`} 
          icon={Zap} 
          status="normal"
        />
        <SensorCard 
          label="TEMP" 
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
    <div className={`p-2 rounded border bg-black/60 backdrop-blur-md transition-colors duration-500 ${
      status === "critical" ? "border-red-500/50 bg-red-950/40" : "border-white/10"
    }`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-mono text-muted-foreground">{label}</span>
        <Icon className={`h-2.5 w-2.5 ${status === "critical" ? "text-red-500" : "text-neon-cyan"}`} />
      </div>
      <div className={`text-lg font-display font-bold tracking-wider ${
        status === "critical" ? "text-red-500 animate-pulse" : "text-white"
      }`}>
        {value}
      </div>
    </div>
  );
}
