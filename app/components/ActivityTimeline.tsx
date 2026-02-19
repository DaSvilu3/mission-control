'use client';

import { TimelineEvent } from '../types';
import { motion } from 'framer-motion';

interface ActivityTimelineProps {
  events: TimelineEvent[];
}

const typeColors: Record<string, string> = {
  session_start: 'border-blue-500',
  task_complete: 'border-green-500',
  cron_run: 'border-purple-500',
  milestone: 'border-yellow-500',
  deploy: 'border-cyan-500',
};

export default function ActivityTimeline({ events }: ActivityTimelineProps) {
  const sorted = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>📊</span> Activity Timeline
      </h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-700" />
        <div className="space-y-4">
          {sorted.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative pl-10"
            >
              <div className={`absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 bg-[#1a1a2e] ${typeColors[event.type] || 'border-gray-500'}`} />
              <div className="bg-gray-800/60 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{event.icon}</span>
                  <h3 className="text-white text-sm font-medium">{event.title}</h3>
                </div>
                <p className="text-gray-400 text-xs">{event.description}</p>
                <span className="text-gray-600 text-[10px] mt-1 block">
                  {new Date(event.timestamp).toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
