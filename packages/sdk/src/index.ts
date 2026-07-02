import { PipelineTask } from "@openbioflow/types";

export interface OpenBioFlowConfig {
  baseUrl: string;
  authToken?: string;
}

export class OpenBioFlowClient {
  private baseUrl: string;
  private authToken?: string;

  constructor(config: OpenBioFlowConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.authToken = config.authToken;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const correlationId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : "client-fallback-id";
    const headers = new Headers(options.headers);
    
    headers.set("Content-Type", "application/json");
    headers.set("X-Correlation-ID", correlationId);
    if (this.authToken) {
      headers.set("Authorization", `Bearer ${this.authToken}`);
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`OpenBioFlow API Error: ${response.statusText} (${response.status})`);
    }

    return response.json() as Promise<T>;
  }

  async getHealth() {
    return this.request<{ status: string; timestamp: number }>("/health");
  }

  async getTasks() {
    return this.request<PipelineTask[]>("/api/v1/tasks");
  }
}
