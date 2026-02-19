import { Task, TaskStatus } from '../types';
import TaskCard from './TaskCard';

interface KanbanBoardProps {
  tasks: Task[];
}

const COLUMN_CONFIG: { status: TaskStatus; title: string; color: string }[] = [
  { status: 'IN_PROGRESS', title: 'IN PROGRESS', color: 'text-blue-400' },
  { status: 'REVIEW', title: 'REVIEW', color: 'text-yellow-400' },
  { status: 'DONE', title: 'DONE', color: 'text-green-400' }
];

export default function KanbanBoard({ tasks }: KanbanBoardProps) {
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {COLUMN_CONFIG.map(column => {
        const columnTasks = getTasksByStatus(column.status);
        
        return (
          <div key={column.status} className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`font-semibold text-sm ${column.color}`}>
                {column.title}
              </h2>
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                {columnTasks.length}
              </span>
            </div>
            
            <div className="space-y-3 min-h-[400px]">
              {columnTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              
              {columnTasks.length === 0 && (
                <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
                  No tasks
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}