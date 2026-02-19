import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const statusColor = agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500';
  
  const roleColors: Record<string, string> = {
    MAIN: 'bg-purple-600',
    COORDINATOR: 'bg-purple-600',
    BUILDER: 'bg-blue-500', 
    RESEARCHER: 'bg-indigo-500',
    WRITER: 'bg-teal-500',
    SALES: 'bg-amber-600'
  };

  const roleIcons: Record<string, string> = {
    MAIN: '🎯',
    COORDINATOR: '🎯',
    BUILDER: '🔨',
    RESEARCHER: '🔍', 
    WRITER: '✍️',
    SALES: '📞'
  };

  const sessionTypeLabel = {
    main: 'Main Session',
    subagent: 'Sub-Agent',
    cron: 'Scheduled'
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-lg">
              {roleIcons[agent.role]}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusColor} rounded-full border-2 border-gray-800`} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{agent.name}</h3>
            <div className="flex items-center space-x-2">
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${roleColors[agent.role]}`}>
                {agent.role}
              </span>
              {agent.sessionType && <span className="text-xs text-gray-400">
                {sessionTypeLabel[agent.sessionType]}
              </span>}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-gray-300 text-sm mb-1">Current Task:</p>
        <p className="text-gray-100 text-sm leading-relaxed">{agent.currentTask}</p>
      </div>
      
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">Last seen: {agent.lastSeen}</span>
        <div className={`flex items-center space-x-1 ${agent.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
          <div className={`w-2 h-2 rounded-full ${statusColor}`} />
          <span className="capitalize font-medium">{agent.status}</span>
        </div>
      </div>
    </div>
  );
}