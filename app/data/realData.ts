import { Agent, Task, CronJob, TimelineEvent, Project, DashboardData, SystemStats } from '../types';

const fallbackAgents: Agent[] = [
  { id: 'main', name: 'Main', role: 'MAIN', currentTask: 'Coordinating QA Round 11 and Mission Control development', status: 'active', lastSeen: '1 min ago', sessionType: 'main' },
  { id: 'forge', name: 'Forge', role: 'BUILDER', currentTask: 'Building Mission Control dashboard', status: 'active', lastSeen: '2 min ago', sessionType: 'subagent' },
  { id: 'scout', name: 'Scout', role: 'RESEARCHER', currentTask: 'Idle - awaiting research tasks', status: 'idle', lastSeen: '2 hours ago', sessionType: 'subagent' },
  { id: 'ghost', name: 'Ghost', role: 'WRITER', currentTask: 'Idle - awaiting writing tasks', status: 'idle', lastSeen: '45 min ago', sessionType: 'subagent' },
];

const fallbackTasks: Task[] = [
  { id: 'sijil-mobile-app', project: 'Sijil ERP', title: 'Mobile App (Flutter)', description: 'Complete Flutter mobile application', priority: 'P0', status: 'DONE', assignedAgent: 'Forge', timestamp: '2024-01-15T14:30:00Z', estimatedHours: 120 },
  { id: 'sijil-api-bugs', project: 'Sijil ERP', title: 'API Bug Fixes', description: 'Critical API endpoints fixes', priority: 'P0', status: 'DONE', assignedAgent: 'Forge', timestamp: '2024-01-20T10:15:00Z', estimatedHours: 24 },
  { id: 'sijil-mobile-features', project: 'Sijil ERP', title: 'Mobile Enhancements', description: 'Enhanced mobile UI/UX with 8 features', priority: 'P1', status: 'DONE', assignedAgent: 'Forge', timestamp: '2024-01-25T16:45:00Z', estimatedHours: 48 },
  { id: 'sijil-tests', project: 'Sijil ERP', title: 'Unit & Integration Tests', description: 'Comprehensive test suite', priority: 'P1', status: 'DONE', assignedAgent: 'Forge', timestamp: '2024-02-01T12:00:00Z', estimatedHours: 32 },
  { id: 'sijil-render', project: 'Sijil ERP', title: 'Render Deploy Fix', description: 'Fixed deployment issues', priority: 'P0', status: 'DONE', assignedAgent: 'Forge', timestamp: '2024-02-05T09:30:00Z', estimatedHours: 8 },
  { id: 'sijil-web', project: 'Sijil ERP', title: 'Web Dashboard Fixes', description: 'UI/UX improvements', priority: 'P1', status: 'DONE', assignedAgent: 'Forge', timestamp: '2024-02-10T15:20:00Z', estimatedHours: 20 },
  { id: 'mc-dashboard', project: 'Mission Control', title: 'Mission Control Dashboard', description: 'Real-time agent dashboard', priority: 'P1', status: 'IN_PROGRESS', assignedAgent: 'Forge', timestamp: '2024-02-19T15:50:00Z', estimatedHours: 12 },
  { id: 'sijil-qa11', project: 'Sijil ERP', title: 'QA Round 11', description: 'Quality assurance testing', priority: 'P2', status: 'IN_PROGRESS', assignedAgent: 'Main', timestamp: '2024-02-19T14:00:00Z', estimatedHours: 16 },
  { id: 'api-integration', project: 'Infrastructure', title: 'Live Session API Integration', description: 'Connect to OpenClaw APIs', priority: 'P1', status: 'REVIEW', assignedAgent: 'Forge', timestamp: '2024-02-19T13:00:00Z', estimatedHours: 8 },
  { id: 'sijil-perf', project: 'Sijil ERP', title: 'Performance Optimization', description: 'Database and API optimization', priority: 'P2', status: 'REVIEW', assignedAgent: 'Forge', timestamp: '2024-02-18T11:30:00Z', estimatedHours: 16 },
];

const fallbackCronJobs: CronJob[] = [
  { id: 'heartbeat', name: 'Heartbeat Check', schedule: '*/30 * * * *', scheduleHuman: 'Every 30 minutes', enabled: true, description: 'Regular heartbeat poll' },
  { id: 'daily-summary', name: 'Daily Summary', schedule: '0 22 * * *', scheduleHuman: 'Daily at 10 PM', enabled: true, description: 'End-of-day summary' },
  { id: 'email-check', name: 'Email Monitor', schedule: '0 */4 * * *', scheduleHuman: 'Every 4 hours', enabled: true, description: 'Check for urgent emails' },
];

const fallbackTimeline: TimelineEvent[] = [
  { id: 'evt-1', type: 'milestone', title: 'Sijil ERP — All 27 tasks complete', description: 'Full ERP system delivered', timestamp: '2026-02-18T22:00:00Z', icon: '🏆' },
  { id: 'evt-2', type: 'session_start', title: 'Mission Control upgrade started', description: 'Forge subagent spawned for dashboard overhaul', timestamp: '2026-02-19T15:50:00Z', icon: '🚀' },
  { id: 'evt-3', type: 'task_complete', title: 'API routes created', description: 'Sessions, cron, and status endpoints ready', timestamp: '2026-02-19T16:30:00Z', icon: '✅' },
  { id: 'evt-4', type: 'cron_run', title: 'Heartbeat check ran', description: 'All systems nominal', timestamp: '2026-02-19T16:00:00Z', icon: '💓' },
  { id: 'evt-5', type: 'deploy', title: 'Mission Control v2 deployed', description: 'Full overhaul with live API integration', timestamp: '2026-02-19T16:45:00Z', icon: '📦' },
];

const fallbackProjects: Project[] = [
  { id: 'sijil-erp', name: 'Sijil ERP', totalTasks: 27, completedTasks: 27, status: 'completed', color: '#10b981' },
  { id: 'mission-control', name: 'Mission Control', totalTasks: 8, completedTasks: 3, status: 'in_progress', color: '#8b5cf6' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSessionsToAgents(sessions: any[]): Agent[] {
  if (!sessions || sessions.length === 0) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sessions.map((s: any) => {
    const key: string = s.sessionKey || s.key || '';
    const parts = key.split(':');
    const name = parts[parts.length - 1] || key;
    const isMain = key.includes(':main:') && !key.includes('subagent') && !key.includes('cron');
    const isCron = key.includes('cron');
    let role: Agent['role'] = 'BUILDER';
    if (isMain) role = 'MAIN';
    if (isCron) role = 'COORDINATOR';
    const lastMsg = s.messages?.[0];
    const task = lastMsg?.content ? (typeof lastMsg.content === 'string' ? lastMsg.content.slice(0, 120) : 'Processing...') : 'Idle';
    return {
      id: key, name: name.charAt(0).toUpperCase() + name.slice(1), role, currentTask: task,
      status: 'active' as const, lastSeen: s.updatedAt ? new Date(s.updatedAt).toLocaleString() : 'Unknown',
      sessionType: isMain ? 'main' as const : isCron ? 'cron' as const : 'subagent' as const,
      sessionKey: key, model: s.model, createdAt: s.createdAt, lastMessages: s.messages,
    };
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCronJobs(data: any): CronJob[] {
  const jobs = data?.jobs || data?.crons || data || [];
  if (!Array.isArray(jobs) || jobs.length === 0) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return jobs.map((j: any) => ({
    id: j.id || j.name || String(Math.random()),
    name: j.name || j.label || j.id || 'Unknown',
    schedule: j.schedule || j.cron || '',
    scheduleHuman: j.scheduleHuman || j.schedule || '',
    lastRun: j.lastRun || j.lastRunAt,
    nextRun: j.nextRun || j.nextRunAt,
    enabled: j.enabled !== false,
    description: j.description || '',
  }));
}

export async function fetchDashboardData(): Promise<DashboardData> {
  let agents = fallbackAgents;
  let cronJobs = fallbackCronJobs;
  let online = false;

  try {
    const [sessionsRes, cronRes, statusRes] = await Promise.allSettled([
      fetch('/api/sessions').then(r => r.json()),
      fetch('/api/cron').then(r => r.json()),
      fetch('/api/status').then(r => r.json()),
    ]);
    if (sessionsRes.status === 'fulfilled' && !sessionsRes.value.error) {
      const mapped = mapSessionsToAgents(sessionsRes.value.sessions || sessionsRes.value);
      if (mapped.length > 0) agents = mapped;
    }
    if (cronRes.status === 'fulfilled' && !cronRes.value.error) {
      const mapped = mapCronJobs(cronRes.value);
      if (mapped.length > 0) cronJobs = mapped;
    }
    if (statusRes.status === 'fulfilled') {
      online = statusRes.value.online === true;
    }
  } catch { /* fallback */ }

  const stats: SystemStats = {
    online, totalSessions: agents.length,
    activeSessions: agents.filter(a => a.status === 'active').length,
    cronJobsCount: cronJobs.length,
    lastHeartbeat: new Date().toISOString(),
  };

  return { agents, tasks: fallbackTasks, cronJobs, stats, timeline: fallbackTimeline, projects: fallbackProjects, lastRefresh: new Date().toISOString() };
}
