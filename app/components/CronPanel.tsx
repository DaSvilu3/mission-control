'use client';

import { CronJob } from '../types';
import { Clock, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

interface CronPanelProps {
  jobs: CronJob[];
}

export default function CronPanel({ jobs }: CronPanelProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Clock size={18} className="text-purple-400" />
        Cron Jobs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {jobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-gray-800/80 border border-gray-700 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-medium text-sm">{job.name}</h3>
              <div className={`flex items-center gap-1 text-[11px] font-medium ${job.enabled ? 'text-green-400' : 'text-gray-500'}`}>
                {job.enabled ? <Play size={10} /> : <Pause size={10} />}
                {job.enabled ? 'Active' : 'Disabled'}
              </div>
            </div>
            <div className="text-xs text-purple-400 font-mono mb-2">{job.schedule}</div>
            <div className="text-xs text-gray-500 mb-3">{job.scheduleHuman}</div>
            {job.description && (
              <p className="text-[11px] text-gray-400 mb-2">{job.description}</p>
            )}
            <div className="flex justify-between text-[10px] text-gray-600 pt-2 border-t border-gray-700/50">
              <span>Last: {job.lastRun ? new Date(job.lastRun).toLocaleString() : '—'}</span>
              <span>Next: {job.nextRun ? new Date(job.nextRun).toLocaleString() : '—'}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
