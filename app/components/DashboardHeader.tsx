'use client';

import { useState, useEffect } from 'react';
import QuickActions from './QuickActions';

interface DashboardHeaderProps {
  lastRefresh: string;
  onRefresh: () => void;
}

export default function DashboardHeader({ lastRefresh, onRefresh }: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatRelative = (ts: string) => {
    const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return `${Math.floor(diff / 60)}h ago`;
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            🎛️ Mission Control
          </h1>
          <p className="text-gray-500 text-sm mt-1">OpenClaw Agent Dashboard</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xs">YM</span>
            </div>
            <div>
              <div className="text-white text-sm font-medium">Yousuf</div>
              <div className="text-gray-500 text-[11px]">Admin</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>🕐 {currentTime.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          <span>Updated {formatRelative(lastRefresh)}</span>
        </div>
        <QuickActions onRefresh={onRefresh} />
      </div>
    </div>
  );
}
