'use client';

import { agents, tasks } from '../data/mockData';
import AgentCard from './AgentCard';
import KanbanBoard from './KanbanBoard';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Mission Control</h1>
          <p className="text-gray-400">Real-time agent monitoring and task management</p>
        </div>

        {/* Agent Cards Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Active Agents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* Kanban Board Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Task Board</h2>
          <KanbanBoard tasks={tasks} />
        </div>
      </div>
    </div>
  );
}