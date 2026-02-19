'use client';

import { Agent } from '../types';
import { motion } from 'framer-motion';

interface AgentCardProps {
  agent: Agent;
  onClick: (agent: Agent) => void;
}

const roleColors: Record<string, string> = {
  MAIN: 'bg-purple-600',
  COORDINATOR: 'bg-purple-600',
  BUILDER: 'bg-blue-500',
  RESEARCHER: 'bg-indigo-500',
  WRITER: 'bg-teal-500',
  SALES: 'bg-amber-600',
};

const roleIcons: Record<string, string> = {
  MAIN: '🎯',
  COORDINATOR: '⚙️',
  BUILDER: '🔨',
  RESEARCHER: '🔍',
  WRITER: '✍️',
  SALES: '📞',
};

const statusDot: Record<string, string> = {
  active: 'bg-green-500',
  idle: 'bg-yellow-500',
  error: 'bg-red-500',
};

export default function AgentCard({ agent, onClick }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick(agent)}
      className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 hover:border-purple-500/40 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="relative">
          <div className="w-11 h-11 bg-gray-700 rounded-full flex items-center justify-center text-lg">
            {roleIcons[agent.role]}
          </div>
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 ${statusDot[agent.status]} rounded-full border-2 border-gray-800 ${agent.status === 'active' ? 'animate-pulse' : ''}`}
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-base truncate">{agent.name}</h3>
          <div className="flex items-center gap-2">
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium text-white ${roleColors[agent.role]}`}>
              {agent.role}
            </span>
            {agent.sessionType && (
              <span className="text-[10px] text-gray-500">
                {agent.sessionType === 'main' ? 'Main' : agent.sessionType === 'cron' ? 'Cron' : 'Sub'}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">{agent.currentTask}</p>

      <div className="flex justify-between items-center text-[11px]">
        <span className="text-gray-500">Last: {agent.lastSeen}</span>
        <span className={`font-medium capitalize ${agent.status === 'active' ? 'text-green-400' : agent.status === 'idle' ? 'text-yellow-400' : 'text-red-400'}`}>
          {agent.status}
        </span>
      </div>
    </motion.div>
  );
}
