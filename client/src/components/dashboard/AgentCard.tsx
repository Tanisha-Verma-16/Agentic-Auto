import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  name: string;
  role: string;
  icon: LucideIcon;
  status: "idle" | "active" | "completed" | "waiting";
  message?: string;
  color: string;
  progress?: number;
}

export function AgentCard({ name, role, icon: Icon, status, message, color, progress }: AgentCardProps) {
  const isActive = status === "active";
  const isCompleted = status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative overflow-hidden rounded-lg border p-4 transition-all duration-300",
        isActive ? "border-neon-cyan bg-primary/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]" : "border-white/10 bg-card/50",
        isCompleted ? "border-neon-green/30 opacity-70" : ""
      )}
    >
      {isActive && (
        <motion.div
          layoutId="active-glow"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      )}

      <div className="flex items-start gap-4">
        <div className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/50",
          isActive && "animate-pulse border-neon-cyan text-neon-cyan",
          isCompleted && "border-neon-green text-neon-green",
          status === "idle" && "text-muted-foreground"
        )}>
          <Icon className="h-6 w-6" />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              {name}
            </h3>
            <span className={cn(
              "text-xs font-mono uppercase",
              isActive ? "text-neon-cyan" : "text-muted-foreground"
            )}>
              {status}
            </span>
          </div>
          <p className="text-xs text-gray-400 font-tech">{role}</p>
          
          {message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 rounded bg-black/60 p-2 text-xs font-mono text-white border border-white/10 shadow-sm"
            >
              <span className="text-neon-cyan mr-2">{">"}</span>
              <span className="text-cyan-50">{message}</span>
            </motion.div>
          )}

          {progress !== undefined && isActive && (
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-neon-cyan shadow-[0_0_10px_cyan]"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
