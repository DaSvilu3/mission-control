export interface Agent {
  id: string;
  name: string;
  role: 'MAIN' | 'COORDINATOR' | 'BUILDER' | 'RESEARCHER' | 'WRITER' | 'SALES';
  currentTask: string;
  status: 'active' | 'idle' | 'error';
  lastSeen: string;
  sessionType?: 'main' | 'subagent' | 'cron';
  sessionKey?: string;
  model?: string;
  createdAt?: string;
  lastMessages?: Array<{ role: string; content: string; timestamp?: string }>;
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

export interface CronJob {
  id: string;
  name: string;
  schedule: string;
  scheduleHuman: string;
  lastRun?: string;
  nextRun?: string;
  enabled: boolean;
  description?: string;
}

export interface SystemStats {
  online: boolean;
  totalSessions: number;
  activeSessions: number;
  cronJobsCount: number;
  lastHeartbeat: string;
  uptime?: string;
}

export interface TimelineEvent {
  id: string;
  type: 'session_start' | 'task_complete' | 'cron_run' | 'milestone' | 'deploy';
  title: string;
  description: string;
  timestamp: string;
  icon?: string;
}

export interface Project {
  id: string;
  name: string;
  totalTasks: number;
  completedTasks: number;
  status: 'completed' | 'in_progress' | 'planned';
  color: string;
}

export interface DashboardData {
  agents: Agent[];
  tasks: Task[];
  cronJobs: CronJob[];
  stats: SystemStats;
  timeline: TimelineEvent[];
  projects: Project[];
  lastRefresh: string;
}
