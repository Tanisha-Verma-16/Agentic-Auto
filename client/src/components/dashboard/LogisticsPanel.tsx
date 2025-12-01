import { motion } from "framer-motion";
import { Package, Calendar, Factory, CheckCircle, Truck, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LogisticsPanelProps {
  step: number;
}

export function LogisticsPanel({ step }: LogisticsPanelProps) {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Inventory Status */}
      <Card className="glass-panel p-4 border-neon-amber/30 flex-1">
        <h3 className="font-display text-sm text-neon-amber flex items-center gap-2 mb-4">
          <Package className="h-4 w-4" />
          INVENTORY & LOGISTICS
        </h3>
        
        <div className="space-y-4">
          <LogisticsItem 
            label="PART AVAILABILITY" 
            status={step >= 2 ? "ordered" : step >= 1 ? "checking" : "idle"}
            value="Alternator (OEM-X99)"
          />
          <LogisticsItem 
            label="WAREHOUSE" 
            status={step >= 2 ? "confirmed" : "idle"}
            value="Central Hub (Zone 4)"
          />
          <LogisticsItem 
            label="SHIPPING ETA" 
            status={step >= 2 ? "shipping" : "idle"}
            value={step >= 2 ? "48 Hours" : "--"}
          />
        </div>
      </Card>

      {/* Calendar */}
      <Card className="glass-panel p-4 border-neon-green/30 flex-1">
        <h3 className="font-display text-sm text-neon-green flex items-center gap-2 mb-4">
          <Calendar className="h-4 w-4" />
          SERVICE SCHEDULE
        </h3>
        
        <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] font-mono text-muted-foreground">
          <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono">
          {[...Array(31)].map((_, i) => {
            const isTargetDay = i === 20; // Let's say the 21st is the target
            const isBooked = step >= 3 && isTargetDay;
            return (
              <div 
                key={i} 
                className={`p-1 rounded transition-all ${
                  isBooked 
                    ? "bg-neon-green text-black font-bold shadow-[0_0_10px_#0f0]" 
                    : "text-white/50 hover:bg-white/10"
                }`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
        {step >= 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-2 bg-neon-green/10 border border-neon-green/50 rounded text-xs text-neon-green font-mono flex items-center gap-2"
          >
            <CheckCircle className="h-3 w-3" />
            SLOT CONFIRMED: SAT 10:00 AM
          </motion.div>
        )}
      </Card>

      {/* Manufacturing Feed */}
      <Card className="glass-panel p-4 border-purple-500/30 flex-1">
        <h3 className="font-display text-sm text-purple-400 flex items-center gap-2 mb-4">
          <Factory className="h-4 w-4" />
          QUALITY INSIGHTS
        </h3>
        
        <div className="space-y-2 font-mono text-xs">
          {step >= 4 ? (
             <motion.div 
               initial={{ opacity: 0, x: -10 }} 
               animate={{ opacity: 1, x: 0 }}
               className="p-2 bg-purple-900/20 border-l-2 border-purple-500 text-purple-200"
             >
               <p className="font-bold">RCA REPORT SUBMITTED</p>
               <p className="opacity-70">Defect ID: #ALT-992</p>
               <p className="opacity-70">Batch: Q4-2024</p>
             </motion.div>
          ) : (
            <div className="text-muted-foreground text-center py-4 italic">
              Waiting for service completion data...
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function LogisticsItem({ label, status, value }: { label: string, status: string, value: string }) {
  let statusColor = "text-gray-500";
  let icon = null;

  if (status === "checking") {
    statusColor = "text-yellow-500";
    icon = <Clock className="h-3 w-3 animate-spin" />;
  } else if (status === "ordered" || status === "confirmed") {
    statusColor = "text-neon-amber";
    icon = <CheckCircle className="h-3 w-3" />;
  } else if (status === "shipping") {
    statusColor = "text-neon-cyan";
    icon = <Truck className="h-3 w-3" />;
  }

  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-2">
      <div className="flex flex-col">
        <span className="text-[10px] text-muted-foreground font-mono">{label}</span>
        <span className={`text-sm font-tech font-semibold ${status === "idle" ? "text-white/30" : "text-white"}`}>
          {value}
        </span>
      </div>
      <div className={statusColor}>{icon}</div>
    </div>
  );
}
