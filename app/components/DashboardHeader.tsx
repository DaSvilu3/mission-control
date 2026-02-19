'use client';

import { useState, useEffect } from 'react';

interface DashboardHeaderProps {
  lastRefresh: string;
  onRefresh: () => void;
}

export default function DashboardHeader({ lastRefresh, onRefresh }: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatLastRefresh = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1 minute ago';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    return date.toLocaleString();
  };

  const formatCurrentTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
            <span className="text-3xl">🎛️</span>
            <span>Mission Control</span>
          </h1>
          <p className="text-gray-400 text-lg">OpenClaw Agent Activity Dashboard</p>
        </div>

        {/* User Info Area */}
        <div className="text-right">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">YM</span>
            </div>
            <div>
              <div className="text-white font-medium">Yousuf's Mission Control</div>
              <div className="text-gray-400 text-sm">Administrator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm">System Online</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>🕐</span>
              <span>{formatCurrentTime(currentTime)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-gray-400 text-sm">
              Last updated: {formatLastRefresh(lastRefresh)}
            </div>
            
            <button 
              onClick={onRefresh}
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-md border border-gray-600 transition-colors flex items-center space-x-1"
            >
              <span>🔄</span>
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}