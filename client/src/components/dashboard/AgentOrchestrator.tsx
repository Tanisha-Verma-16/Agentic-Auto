import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AgentCard } from "./AgentCard";
import { BrainCircuit } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { AgentStep } from "@/lib/types";

interface AgentOrchestratorProps {
  agents: AgentStep[];
}

export function AgentOrchestrator({ agents }: AgentOrchestratorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the active agent
  useEffect(() => {
    if (scrollRef.current) {
      const activeAgentIndex = agents.findIndex(a => a.status === "active");
      if (activeAgentIndex !== -1) {
        const container = scrollRef.current;
        const cards = container.querySelectorAll('.agent-card-wrapper');
        if (cards[activeAgentIndex]) {
          cards[activeAgentIndex].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }
    }
  }, [agents]);

  return (
    <Card className="glass-panel h-full flex flex-col overflow-hidden relative border-neon-cyan/30">
      <div className="p-6 border-b border-white/10 bg-black/40">
        <h2 className="font-display text-xl text-white flex items-center gap-2">
          <BrainCircuit className="text-neon-cyan animate-pulse" />
          AGENT ORCHESTRATOR
        </h2>
        <p className="text-xs text-muted-foreground font-mono mt-1">
          AUTONOMOUS WORKFLOW MONITOR
        </p>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-neon-cyan/20 scrollbar-track-transparent"
      >
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[2.25rem] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          
          <div className="space-y-6">
            {agents.map((agent, index) => (
              <div key={agent.id} className="agent-card-wrapper">
                <AgentCard
                  name={agent.name}
                  role={agent.role}
                  icon={agent.icon}
                  status={agent.status}
                  message={agent.message}
                  color={agent.color}
                  progress={agent.progress}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom visual flair */}
      <div className="h-1 w-full bg-gradient-to-r from-neon-cyan via-neon-amber to-neon-cyan opacity-50" />
    </Card>
  );
}
