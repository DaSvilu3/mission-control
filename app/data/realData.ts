import { Agent, Task, DashboardData } from '../types';

// Real OpenClaw sessions/agents
export const agents: Agent[] = [
  {
    id: 'main',
    name: 'Main',
    role: 'MAIN',
    currentTask: 'Coordinating QA Round 11 and Mission Control development',
    status: 'active',
    lastSeen: '1 min ago',
    sessionType: 'main'
  },
  {
    id: 'forge',
    name: 'Forge',
    role: 'BUILDER', 
    currentTask: 'Building Mission Control dashboard',
    status: 'active',
    lastSeen: '2 min ago',
    sessionType: 'subagent'
  },
  {
    id: 'scout',
    name: 'Scout',
    role: 'RESEARCHER',
    currentTask: 'Idle - awaiting research tasks',
    status: 'idle',
    lastSeen: '2 hours ago',
    sessionType: 'subagent'
  },
  {
    id: 'ghost',
    name: 'Ghost', 
    role: 'WRITER',
    currentTask: 'Idle - awaiting writing tasks',
    status: 'idle',
    lastSeen: '45 min ago',
    sessionType: 'subagent'
  }
];

// Real tasks from actual OpenClaw work
export const tasks: Task[] = [
  // DONE TASKS - Sijil ERP Project
  {
    id: 'sijil-mobile-app',
    project: 'Sijil ERP',
    title: 'Mobile App (Flutter)',
    description: 'Complete Flutter mobile application with all core ERP features',
    priority: 'P0',
    status: 'DONE',
    assignedAgent: 'Forge',
    timestamp: '2024-01-15T14:30:00Z',
    estimatedHours: 120
  },
  {
    id: 'sijil-api-bugs',
    project: 'Sijil ERP',
    title: 'API Bug Fixes',
    description: 'Critical API endpoints fixes and performance improvements',
    priority: 'P0', 
    status: 'DONE',
    assignedAgent: 'Forge',
    timestamp: '2024-01-20T10:15:00Z',
    estimatedHours: 24
  },
  {
    id: 'sijil-mobile-features',
    project: 'Sijil ERP',
    title: 'Mobile Enhancements (8 features)',
    description: 'Enhanced mobile UI/UX with 8 new feature implementations',
    priority: 'P1',
    status: 'DONE', 
    assignedAgent: 'Forge',
    timestamp: '2024-01-25T16:45:00Z',
    estimatedHours: 48
  },
  {
    id: 'sijil-tests',
    project: 'Sijil ERP',
    title: 'Unit & Integration Tests',
    description: 'Comprehensive test suite for API and mobile components',
    priority: 'P1',
    status: 'DONE',
    assignedAgent: 'Forge', 
    timestamp: '2024-02-01T12:00:00Z',
    estimatedHours: 32
  },
  {
    id: 'sijil-render-deploy',
    project: 'Sijil ERP',
    title: 'Render Deploy Fix',
    description: 'Fixed deployment issues on Render hosting platform',
    priority: 'P0',
    status: 'DONE',
    assignedAgent: 'Forge',
    timestamp: '2024-02-05T09:30:00Z',
    estimatedHours: 8
  },
  {
    id: 'sijil-web-dashboard',
    project: 'Sijil ERP',
    title: 'Web Dashboard Fixes',
    description: 'UI/UX improvements and bug fixes for web dashboard',
    priority: 'P1',
    status: 'DONE',
    assignedAgent: 'Forge',
    timestamp: '2024-02-10T15:20:00Z',
    estimatedHours: 20
  },

  // IN PROGRESS TASKS
  {
    id: 'mission-control-dashboard',
    project: 'Mission Control',
    title: 'Mission Control Dashboard',
    description: 'Real-time dashboard for tracking OpenClaw agent activities and tasks',
    priority: 'P1',
    status: 'IN_PROGRESS',
    assignedAgent: 'Forge',
    timestamp: '2024-02-19T15:50:00Z',
    estimatedHours: 12
  },
  {
    id: 'sijil-qa-round-11',
    project: 'Sijil ERP',
    title: 'QA Round 11',
    description: 'Comprehensive quality assurance testing and bug fixes',
    priority: 'P2',
    status: 'IN_PROGRESS',
    assignedAgent: 'Main',
    timestamp: '2024-02-19T14:00:00Z',
    estimatedHours: 16
  },

  // Additional realistic tasks
  {
    id: 'openclaw-integration',
    project: 'Infrastructure',
    title: 'Live Session API Integration',
    description: 'Connect dashboard to OpenClaw sessions_list and cron APIs',
    priority: 'P1', 
    status: 'REVIEW',
    assignedAgent: 'Forge',
    timestamp: '2024-02-19T13:00:00Z',
    estimatedHours: 8
  },
  {
    id: 'sijil-performance',
    project: 'Sijil ERP',
    title: 'Performance Optimization',
    description: 'Database query optimization and API response time improvements',
    priority: 'P2',
    status: 'REVIEW',
    assignedAgent: 'Forge',
    timestamp: '2024-02-18T11:30:00Z',
    estimatedHours: 16
  }
];

// Mock function that could be replaced with real API call
export async function fetchDashboardData(): Promise<DashboardData> {
  // TODO: Replace with actual OpenClaw API calls:
  // - GET /api/sessions for agent data
  // - GET /api/cron/jobs for scheduled tasks
  // - GET /api/tasks or similar for task data
  
  return {
    agents,
    tasks,
    lastRefresh: new Date().toISOString()
  };
}

// Helper functions for future API integration
export const apiEndpoints = {
  sessions: '/api/sessions',
  cron: '/api/cron/jobs', 
  tasks: '/api/tasks'
};

export const projectCategories = [
  'Sijil ERP',
  'Mission Control',
  'Infrastructure', 
  'Research',
  'Documentation'
];