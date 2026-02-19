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

  const getAgentInitial = (agentName: string) => {
    return agentName.charAt(0);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-medium text-sm leading-tight pr-2">
          {task.title}
        </h3>
        <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      
      <p className="text-gray-400 text-xs mb-3 line-clamp-2">
        {task.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-gray-300 font-medium text-xs">
              {getAgentInitial(task.assignedAgent)}
            </span>
          </div>
          <span className="text-gray-400 text-xs">{task.assignedAgent}</span>
        </div>
        
        <span className="text-gray-500 text-xs">
          {formatTimestamp(task.timestamp)}
        </span>
      </div>
    </div>
  );
}