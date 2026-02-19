'use client';

import { SystemStats } from '../types';
import { Activity, Users, Clock, Wifi, WifiOff } from 'lucide-react';

interface SystemStatsBarProps {
  stats: SystemStats;
}

export default function SystemStatsBar({ stats }: SystemStatsBarProps) {
  const items = [
    {
      icon: stats.online ? Wifi : WifiOff,
      label: 'Gateway',
      value: stats.online ? 'Connected' : 'Offline',
      color: stats.online ? 'text-green-400' : 'text-red-400',
    },
    {
      icon: Users,
      label: 'Sessions',
      value: `${stats.activeSessions} active / ${stats.totalSessions}`,
      color: 'text-blue-400',
    },
    {
      icon: Clock,
      label: 'Cron Jobs',
      value: String(stats.cronJobsCount),
      color: 'text-purple-400',
    },
    {
      icon: Activity,
      label: 'Last Heartbeat',
      value: new Date(stats.lastHeartbeat).toLocaleTimeString(),
      color: 'text-gray-400',
    },
  ];

  return (
    <div className="bg-[#12122a] border border-gray-800 rounded-xl px-4 py-3 flex items-center gap-6 flex-wrap">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="flex items-center gap-2 text-sm">
            <Icon size={14} className={item.color} />
            <span className="text-gray-500">{item.label}:</span>
            <span className={`font-medium ${item.color}`}>{item.value}</span>
          </div>
        );
      })}
    </div>
  );
}
