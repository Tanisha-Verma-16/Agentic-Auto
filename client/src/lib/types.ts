export type AgentStep = {
  id: string;
  name: string;
  role: string;
  icon: any;
  status: "idle" | "active" | "completed" | "waiting";
  message: string;
  color: string;
  progress: number;
};
