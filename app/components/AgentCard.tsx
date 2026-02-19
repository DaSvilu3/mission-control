import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const statusColor = agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500';
  
  const roleColors = {
    BUILDER: 'bg-blue-500',
    RESEARCHER: 'bg-purple-500',
    WRITER: 'bg-indigo-500',
    SALES: 'bg-orange-500'
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-gray-300 font-semibold text-sm">
                {agent.name.charAt(0)}
              </span>
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusColor} rounded-full border-2 border-gray-800`} />
          </div>
          <div>
            <h3 className="text-white font-semibold">{agent.name}</h3>
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${roleColors[agent.role]}`}>
              {agent.role}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-gray-300 text-sm mb-1">Current Task:</p>
        <p className="text-gray-100 text-sm">{agent.currentTask}</p>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>Last seen: {agent.lastSeen}</span>
        <div className={`flex items-center space-x-1 ${agent.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
          <div className={`w-2 h-2 rounded-full ${statusColor}`} />
          <span className="capitalize">{agent.status}</span>
        </div>
      </div>
    </div>
  );
}