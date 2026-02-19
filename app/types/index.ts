export interface Agent {
  id: string;
  name: string;
  role: 'MAIN' | 'COORDINATOR' | 'BUILDER' | 'RESEARCHER' | 'WRITER' | 'SALES';
  currentTask: string;
  status: 'active' | 'idle';
  lastSeen: string;
  sessionType?: 'main' | 'subagent' | 'cron';
}

export interface Task {
  id: string;
  project: string;
  title: string;
  description: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  assignedAgent: string;
  timestamp: string;
  estimatedHours?: number;
}

export type TaskStatus = 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export interface DashboardData {
  agents: Agent[];
  tasks: Task[];
  lastRefresh: string;
}
