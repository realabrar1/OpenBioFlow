// Shared Types for OpenBioFlow AI

export interface User {
  id: string;
  email: string;
  name?: string;
  isActive: boolean;
}

export interface PipelineTask {
  taskId: string;
  status: "pending" | "running" | "completed" | "failed";
  progress: number;
  resultUrl?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}
