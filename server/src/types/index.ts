export type Role = 'student' | 'educator';

export interface User {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface Institution {
  id: string;
  domain: string;
  name: string;
  verified: boolean;
  createdAt: string;
}

export interface ProcessLogEvent {
  type: 'insert' | 'delete' | 'paste' | 'cursor' | 'pause' | 'selection' | string;
  timestamp: number;
  data?: Record<string, unknown>;
}
