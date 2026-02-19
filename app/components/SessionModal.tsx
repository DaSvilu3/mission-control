'use client';

import { Agent } from '../types';
import { X, Terminal, Clock, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SessionModalProps {
  agent: Agent | null;
  onClose: () => void;
}

export default function SessionModal({ agent, onClose }: SessionModalProps) {
  return (
    <AnimatePresence>
      {agent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-end"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60" />
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md h-full bg-[#12122a] border-l border-gray-800 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">{agent.name}</h2>
              <button onClick={onClose} className="p-1 rounded hover:bg-gray-800 text-gray-400">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <InfoRow icon={<Terminal size={14} />} label="Session Key" value={agent.sessionKey || agent.id} />
              <InfoRow icon={<Cpu size={14} />} label="Model" value={agent.model || 'Unknown'} />
              <InfoRow icon={<Clock size={14} />} label="Created" value={agent.createdAt ? new Date(agent.createdAt).toLocaleString() : 'Unknown'} />
              <InfoRow icon={<Clock size={14} />} label="Last Seen" value={agent.lastSeen} />

              <div className="pt-4 border-t border-gray-800">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Last Messages</h3>
                {agent.lastMessages && agent.lastMessages.length > 0 ? (
                  <div className="space-y-2">
                    {agent.lastMessages.map((msg, i) => (
                      <div key={i} className="bg-gray-800/60 rounded-lg p-3">
                        <div className="text-[10px] text-purple-400 font-medium mb-1">{msg.role}</div>
                        <p className="text-gray-300 text-xs leading-relaxed">
                          {typeof msg.content === 'string' ? msg.content.slice(0, 300) : JSON.stringify(msg.content).slice(0, 300)}
                          {typeof msg.content === 'string' && msg.content.length > 300 ? '...' : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-xs">No messages available</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Status</h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${agent.status === 'active' ? 'bg-green-500 animate-pulse' : agent.status === 'idle' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  <span className="text-gray-300 text-sm capitalize">{agent.status}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-gray-500">{icon}</div>
      <div>
        <div className="text-[11px] text-gray-500">{label}</div>
        <div className="text-sm text-gray-200 font-mono break-all">{value}</div>
      </div>
    </div>
  );
}
