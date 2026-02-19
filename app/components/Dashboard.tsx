'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchDashboardData } from '../data/realData';
import { DashboardData, Agent } from '../types';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import SystemStatsBar from './SystemStatsBar';
import AgentCard from './AgentCard';
import KanbanBoard from './KanbanBoard';
import CronPanel from './CronPanel';
import ActivityTimeline from './ActivityTimeline';
import ProjectCards from './ProjectCards';
import SessionModal from './SessionModal';
import { motion } from 'framer-motion';

type NavItem = 'dashboard' | 'sessions' | 'cron' | 'projects' | 'settings';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const loadData = useCallback(async () => {
    try {
      const d = await fetchDashboardData();
      setData(d);
    } catch (e) {
      console.error('Failed to load:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading Mission Control...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load data</p>
          <button onClick={loadData} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeNav) {
      case 'sessions':
        return (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">All Sessions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} onClick={setSelectedAgent} />
              ))}
            </div>
          </div>
        );

      case 'cron':
        return <CronPanel jobs={data.cronJobs} />;

      case 'projects':
        return (
          <div className="space-y-8">
            <ProjectCards projects={data.projects} />
            <KanbanBoard tasks={data.tasks} />
          </div>
        );

      case 'settings':
        return (
          <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-6 max-w-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Auto-refresh interval</label>
                <p className="text-gray-300 text-sm">30 seconds</p>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Gateway endpoint</label>
                <p className="text-gray-300 text-sm font-mono">http://localhost:18789</p>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Token status</label>
                <p className="text-gray-300 text-sm">{data.stats.online ? '✅ Configured & connected' : '⚠️ Not connected (using fallback data)'}</p>
              </div>
            </div>
          </div>
        );

      default: // dashboard
        return (
          <div className="space-y-6">
            <SystemStatsBar stats={data.stats} />

            {/* Agents */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  🤖 Active Sessions
                </h2>
                <span className="text-xs text-gray-500">
                  {data.agents.filter((a) => a.status === 'active').length} active / {data.agents.length} total
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {data.agents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} onClick={setSelectedAgent} />
                ))}
              </div>
            </section>

            {/* Two columns: Timeline + Cron/Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ActivityTimeline events={data.timeline} />
              </div>
              <div className="lg:col-span-2 space-y-6">
                <CronPanel jobs={data.cronJobs} />
                <ProjectCards projects={data.projects} />
              </div>
            </div>

            {/* Kanban */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  📋 Project Tasks
                </h2>
                <span className="text-xs text-gray-500">{data.tasks.length} tasks</span>
              </div>
              <KanbanBoard tasks={data.tasks} />
            </section>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#1a1a2e]">
      <Sidebar active={activeNav} onNavigate={setActiveNav} />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader lastRefresh={data.lastRefresh} onRefresh={loadData} />
          <motion.div key={activeNav} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {renderContent()}
          </motion.div>
        </div>
      </main>
      <SessionModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
    </div>
  );
}
