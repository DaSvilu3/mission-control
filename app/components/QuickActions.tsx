'use client';

import { RefreshCw, Zap, MessageSquare } from 'lucide-react';

interface QuickActionsProps {
  onRefresh: () => void;
}

export default function QuickActions({ onRefresh }: QuickActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onRefresh}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg border border-gray-700 transition-colors"
      >
        <RefreshCw size={12} />
        Refresh
      </button>
      <button
        onClick={() => alert('Cron trigger not yet wired to live API')}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 text-xs rounded-lg border border-purple-500/30 transition-colors"
      >
        <Zap size={12} />
        Trigger Cron
      </button>
      <button
        onClick={() => alert('Message sending not yet wired to live API')}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs rounded-lg border border-blue-500/30 transition-colors"
      >
        <MessageSquare size={12} />
        Send Message
      </button>
    </div>
  );
}
