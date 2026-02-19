'use client';

import { useState, useEffect } from 'react';
import { fetchDashboardData } from '../data/realData';
import { DashboardData } from '../types';
import AgentCard from './AgentCard';
import KanbanBoard from './KanbanBoard';
import DashboardHeader from './DashboardHeader';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await fetchDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    loadDashboardData();
  };

  if (loading && !dashboardData) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Mission Control...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load dashboard data</p>
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { agents, tasks, lastRefresh } = dashboardData;

  return (
    <div className="min-h-screen bg-[#1a1a2e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <DashboardHeader 
          lastRefresh={lastRefresh}
          onRefresh={handleRefresh}
        />

        {/* Agents Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
              <span>🤖</span>
              <span>Active Sessions</span>
            </h2>
            <div className="text-gray-400 text-sm">
              {agents.filter(a => a.status === 'active').length} active • {agents.length} total
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* Task Board */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
              <span>📋</span>
              <span>Project Tasks</span>
            </h2>
            <div className="text-gray-400 text-sm">
              {tasks.length} tasks across {Array.from(new Set(tasks.map(t => t.project))).length} projects
            </div>
          </div>
          
          <KanbanBoard tasks={tasks} />
        </div>

        {/* Future API Integration Note */}
        <div className="mt-8 p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg">
          <div className="flex items-start space-x-3">
            <span className="text-yellow-400">⚠️</span>
            <div>
              <h3 className="text-yellow-400 font-medium mb-1">Development Note</h3>
              <p className="text-gray-400 text-sm">
                This dashboard currently uses hardcoded data. Next phase will integrate with OpenClaw's live APIs:
              </p>
              <ul className="text-gray-500 text-xs mt-2 space-y-1">
                <li>• <code className="bg-gray-700 px-1 rounded">GET /api/sessions</code> for real agent status</li>
                <li>• <code className="bg-gray-700 px-1 rounded">GET /api/cron/jobs</code> for scheduled tasks</li>
                <li>• <code className="bg-gray-700 px-1 rounded">GET /api/tasks</code> for live project data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}