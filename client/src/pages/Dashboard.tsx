import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Play, RotateCcw, 
  Activity, Search, Truck, Phone, Calendar, Factory, ShieldCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DigitalTwin } from "@/components/dashboard/DigitalTwin";
import { AgentOrchestrator } from "@/components/dashboard/AgentOrchestrator";
import { LogisticsPanel } from "@/components/dashboard/LogisticsPanel";
import { SecurityOverlay } from "@/components/dashboard/SecurityOverlay";
import { toast } from "sonner";
import type { AgentStep } from "@/lib/types";

const INITIAL_AGENTS: AgentStep[] = [
  { 
    id: "data", 
    name: "Data Analysis Agent", 
    role: "Real-time Sensor Monitoring", 
    icon: Activity, 
    status: "idle", 
    message: "Monitoring sensor streams...",
    color: "cyan",
    progress: 0 
  },
  { 
    id: "diagnosis", 
    name: "Diagnosis Agent", 
    role: "Predictive Maintenance Model", 
    icon: Search, 
    status: "idle", 
    message: "Waiting for data trigger...",
    color: "purple",
    progress: 0 
  },
  { 
    id: "logistics", 
    name: "Logistics Agent", 
    role: "Inventory & Supply Chain", 
    icon: Truck, 
    status: "idle", 
    message: "Standby for parts request...",
    color: "amber",
    progress: 0 
  },
  { 
    id: "voice", 
    name: "Customer Voice Agent", 
    role: "Customer Interaction Interface", 
    icon: Phone, 
    status: "idle", 
    message: "Communication channels active.",
    color: "blue",
    progress: 0 
  },
  { 
    id: "schedule", 
    name: "Scheduling Agent", 
    role: "Service Center Coordination", 
    icon: Calendar, 
    status: "idle", 
    message: "Calendar synced.",
    color: "green",
    progress: 0 
  },
  { 
    id: "quality", 
    name: "Quality Insights Agent", 
    role: "Manufacturing Feedback Loop", 
    icon: Factory, 
    status: "idle", 
    message: "Analyzing service reports...",
    color: "pink",
    progress: 0 
  },
  { 
    id: "ueba", 
    name: "UEBA Security Agent", 
    role: "Behavioral Anomaly Detection", 
    icon: ShieldCheck, 
    status: "active", 
    message: "Monitoring system integrity...",
    color: "red",
    progress: 100 
  },
];

export default function Dashboard() {
  const [agents, setAgents] = useState<AgentStep[]>(INITIAL_AGENTS);
  const [simulationStep, setSimulationStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Simulation Logic
  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];

    // Step 1: Data Agent detects issue (Start immediately)
    timeouts.push(setTimeout(() => {
      setSimulationStep(1);
      updateAgent("data", "active", "Voltage instability detected (11.2V). Flagging anomaly.", 100);
    }, 1000));

    // Step 2: Diagnosis Agent analyzes (at 4s)
    timeouts.push(setTimeout(() => {
      updateAgent("data", "completed", "Anomaly flagged.", 100);
      updateAgent("diagnosis", "active", "Predicting component failure: Alternator (85% probability). Failure in 7 days.", 100);
    }, 4000));

    // Step 3: Logistics Agent checks stock (at 8s)
    timeouts.push(setTimeout(() => {
      updateAgent("diagnosis", "completed", "RCA: Alternator Wear.", 100);
      updateAgent("logistics", "active", "Checking inventory... Part #ALT-992 out of stock. Ordering from Central Warehouse (ETA 48h).", 100);
      setSimulationStep(2);
    }, 8000));

    // Step 4: Customer Voice Agent contacts user (at 12s)
    timeouts.push(setTimeout(() => {
      updateAgent("logistics", "completed", "Order Confirmed #ORD-7782", 100);
      updateAgent("voice", "active", "Initiating Call... 'Hi Rohan, detected potential failure. Slot available Sat 10 AM?'", 100);
    }, 12000));

    // Step 5: Scheduling Agent books slot (at 16s)
    timeouts.push(setTimeout(() => {
      updateAgent("voice", "completed", "Customer approved.", 100);
      updateAgent("schedule", "active", "Booking Service Bay 4. Allocated mechanic: J. Doe.", 100);
      setSimulationStep(3);
    }, 16000));

    // Step 6: Quality Insights (at 20s)
    timeouts.push(setTimeout(() => {
      updateAgent("schedule", "completed", "Appointment Confirmed.", 100);
      updateAgent("quality", "active", "Submitting Defect Report to Factory Dashboard. Batch Q4-2024 flagged.", 100);
      setSimulationStep(4);
    }, 20000));

    // Finish
    timeouts.push(setTimeout(() => {
      updateAgent("quality", "completed", "Feedback Loop Closed.", 100);
      setIsRunning(false);
      toast.success("Proactive Maintenance Workflow Completed Successfully");
    }, 24000));

    return () => timeouts.forEach(clearTimeout);
  }, [isRunning]);

  const updateAgent = (id: string, status: AgentStep["status"], message: string, progress: number) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? { ...agent, status, message, progress } : agent
    ));
  };

  const startSimulation = () => {
    setAgents(INITIAL_AGENTS);
    setSimulationStep(0);
    setIsRunning(true);
  };

  const resetSimulation = () => {
    setAgents(INITIAL_AGENTS);
    setSimulationStep(0);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tighter bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
            AGENTIC<span className="text-neon-cyan">.AUTO</span>
          </h1>
          <p className="text-muted-foreground font-tech tracking-wide text-sm mt-1">
            AUTONOMOUS VEHICLE INTELLIGENCE DASHBOARD v2.4
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={isRunning ? resetSimulation : startSimulation}
            disabled={isRunning}
            className={`font-display tracking-widest ${
              isRunning 
                ? "bg-gray-800 text-gray-400 cursor-not-allowed border-gray-700" 
                : "bg-neon-cyan text-black hover:bg-cyan-400 shadow-[0_0_15px_cyan]"
            }`}
          >
            {isRunning ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-spin" />
                RUNNING...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                START SIMULATION
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={resetSimulation}
            className="border-white/20 hover:bg-white/10 text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* Left Panel: Digital Twin (3 cols) */}
        <div className="lg:col-span-4 flex flex-col min-h-[400px]">
          <DigitalTwin isSimulationRunning={isRunning} step={simulationStep} />
        </div>

        {/* Center Panel: Orchestrator (5 cols) */}
        <div className="lg:col-span-5 flex flex-col min-h-[400px]">
          <AgentOrchestrator agents={agents} />
        </div>

        {/* Right Panel: Logistics (3 cols) */}
        <div className="lg:col-span-3 flex flex-col min-h-[400px]">
          <LogisticsPanel step={simulationStep} />
        </div>

      </div>

      <SecurityOverlay isSimulationRunning={isRunning} />
      
      {/* Background Grid Effect */}
      <div className="fixed inset-0 -z-10 grid-bg pointer-events-none opacity-20" />
    </div>
  );
}
