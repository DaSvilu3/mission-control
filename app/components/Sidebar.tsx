'use client';

import { LayoutDashboard, Users, Clock, FolderKanban, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type NavItem = 'dashboard' | 'sessions' | 'cron' | 'projects' | 'settings';

interface SidebarProps {
  active: NavItem;
  onNavigate: (item: NavItem) => void;
}

const navItems: { id: NavItem; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'sessions', label: 'Sessions', icon: Users },
  { id: 'cron', label: 'Cron Jobs', icon: Clock },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${collapsed ? 'w-16' : 'w-56'} transition-all duration-200 bg-[#12122a] border-r border-gray-800 flex flex-col min-h-screen`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <span className="text-lg font-bold text-white tracking-tight">🎛️ MC</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-800 text-gray-400"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4">
        {!collapsed && (
          <div className="text-xs text-gray-600 text-center">
            Mission Control v2.0
          </div>
        )}
      </div>
    </aside>
  );
}
