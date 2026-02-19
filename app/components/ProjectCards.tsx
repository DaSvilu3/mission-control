'use client';

import { Project } from '../types';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface ProjectCardsProps {
  projects: Project[];
}

export default function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>📁</span> Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, i) => {
          const pct = Math.round((project.completedTasks / project.totalTasks) * 100);
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800/80 border border-gray-700 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">{project.name}</h3>
                {project.status === 'completed' ? (
                  <CheckCircle2 size={18} className="text-green-400" />
                ) : (
                  <Loader2 size={18} className="text-purple-400 animate-spin" />
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>{project.completedTasks}/{project.totalTasks} tasks</span>
                <span>{pct}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  className="h-2 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
              </div>
              <div className="mt-2 text-[11px] capitalize" style={{ color: project.color }}>
                {project.status.replace('_', ' ')}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
