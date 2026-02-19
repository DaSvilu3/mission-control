export interface Agent {
  id: string;
  name: string;
  role: 'BUILDER' | 'RESEARCHER' | 'WRITER' | 'SALES';
  currentTask: string;
  status: 'active' | 'idle';
  lastSeen: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  assignedAgent: string;
  timestamp: string;
}

export type TaskStatus = 'IN_PROGRESS' | 'REVIEW' | 'DONE';