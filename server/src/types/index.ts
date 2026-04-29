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

// Document, ProcessLog, Analysis, ProcessLogShare interfaces added in Phase 5+
