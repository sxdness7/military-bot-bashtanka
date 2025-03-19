
import React from 'react';
import { ShieldCheck, Activity, Wifi } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

type StatusPanelProps = {
  alertActive: boolean;
  internetStatus: 'online' | 'limited' | 'offline';
  lastUpdate: string;
};

const internetStatusConfig = {
  online: { status: 'safe', label: 'СТАБИЛЬНО' },
  limited: { status: 'warning', label: 'ОГРАНИЧЕНО' },
  offline: { status: 'alert', label: 'ОФЛАЙН' },
} as const;

const StatusPanel = ({ alertActive, internetStatus, lastUpdate }: StatusPanelProps) => {
  return (
    <div className="grid-panel h-full">
      <h2 className="text-lg font-semibold mb-4 title-font flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-military-accent" />
        СТАТУС СИСТЕМЫ
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-gray-300">Статус тревоги</div>
          <StatusBadge 
            status={alertActive ? 'alert' : 'safe'} 
            pulsing={alertActive}
          >
            {alertActive ? 'АКТИВНА' : 'НЕАКТИВНА'}
          </StatusBadge>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="text-sm text-gray-300">Интернет</div>
          <StatusBadge 
            status={internetStatusConfig[internetStatus].status}
            pulsing={internetStatus === 'offline'}
          >
            <Wifi className="h-4 w-4" />
            {internetStatusConfig[internetStatus].label}
          </StatusBadge>
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-xs text-military-accent">
        <Activity className="h-4 w-4" />
        <span>Последнее обновление: {lastUpdate}</span>
      </div>
    </div>
  );
};

export default StatusPanel;
