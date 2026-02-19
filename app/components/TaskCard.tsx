import { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const priorityColors = {
    P0: 'bg-red-500 text-white',
    P1: 'bg-orange-500 text-white', 
    P2: 'bg-blue-500 text-white'
  };

  const projectColors = {
    'Sijil ERP': 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10',
    'Mission Control': 'text-purple-400 border-purple-400/20 bg-purple-400/10',
    'Infrastructure': 'text-blue-400 border-blue-400/20 bg-blue-400/10',
    'Research': 'text-indigo-400 border-indigo-400/20 bg-indigo-400/10',
    'Documentation': 'text-teal-400 border-teal-400/20 bg-teal-400/10'
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getAgentIcon = (agentName: string) => {
    const icons = {
      'Main': '🎯',
      'Forge': '🔨',
      'Scout': '🔍',
      'Ghost': '✍️'
    };
    return icons[agentName as keyof typeof icons] || agentName.charAt(0);
  };

  const defaultProjectStyle = 'text-gray-400 border-gray-600/20 bg-gray-600/10';
  const projectStyle = projectColors[task.project as keyof typeof projectColors] || defaultProjectStyle;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors cursor-pointer group">
      {/* Project and Priority Header */}
      <div className="flex items-center justify-between mb-2">
        <span className={`px-2 py-1 rounded text-xs font-medium border ${projectStyle}`}>
          {task.project}
        </span>
        <span className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {/* Task Title */}
      <h3 className="text-white font-semibold text-sm leading-tight mb-2 group-hover:text-gray-100">
        {task.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">
        {task.description}
      </p>

      {/* Estimated Hours (if available) */}
      {task.estimatedHours && (
        <div className="text-xs text-gray-500 mb-2">
          Est: {task.estimatedHours}h
        </div>
      )}
      
      {/* Footer - Agent and Timestamp */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs">
            {getAgentIcon(task.assignedAgent)}
          </div>
          <span className="text-gray-400 text-xs font-medium">{task.assignedAgent}</span>
        </div>
        
        <span className="text-gray-500 text-xs">
          {formatTimestamp(task.timestamp)}
        </span>
      </div>
    </div>
  );
}