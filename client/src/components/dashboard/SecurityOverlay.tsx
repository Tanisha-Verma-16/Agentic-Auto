import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertOctagon } from "lucide-react";
import { Toaster, toast } from "sonner";

export function SecurityOverlay({ isSimulationRunning }: { isSimulationRunning: boolean }) {
  useEffect(() => {
    if (!isSimulationRunning) return;

    // Randomly trigger a security alert toast
    const timeout = setTimeout(() => {
      toast.custom((t) => (
        <div className="bg-red-950/90 border border-red-500 text-red-100 p-4 rounded-lg shadow-[0_0_20px_rgba(255,0,0,0.5)] flex items-start gap-3 w-[350px]">
          <AlertOctagon className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display font-bold text-sm text-red-500">UEBA SECURITY ALERT</h4>
            <p className="text-xs font-mono mt-1">Blocked unauthorized data access attempt from external IP 192.168.X.X</p>
            <p className="text-[10px] font-mono text-red-400/50 mt-2">Timestamp: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      ));
    }, 8000); // Trigger 8 seconds into simulation

    return () => clearTimeout(timeout);
  }, [isSimulationRunning]);

  return (
    <>
      {/* Persistent Badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur border border-white/10 rounded-full shadow-lg">
          <Shield className="h-3 w-3 text-neon-green" />
          <span className="text-[10px] font-mono text-neon-green tracking-wider">SYSTEM SECURE</span>
          <div className="h-1.5 w-1.5 rounded-full bg-neon-green animate-pulse" />
        </div>
      </div>
    </>
  );
}
