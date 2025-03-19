
import React from 'react';
import { Activity, AlertTriangle, Skull } from 'lucide-react';

interface RadiationData {
  level: number;
  status: 'normal' | 'elevated' | 'dangerous';
  lastUpdate: string;
}

const getRadiationStatus = (level: number): 'normal' | 'elevated' | 'dangerous' => {
  if (level < 30) return 'normal';
  if (level < 50) return 'elevated';
  return 'dangerous';
};

const RadiationMonitor = ({ city }: { city: string }) => {
  const radiationData: RadiationData = {
    level: city === 'Дублин' ? 12 : city === 'Алматы' ? 15 : city === 'Белград' ? 18 : 20,
    status: getRadiationStatus(city === 'Дублин' ? 12 : city === 'Алматы' ? 15 : city === 'Белград' ? 18 : 20),
    lastUpdate: new Date().toLocaleString('ru-RU')
  };

  return (
    <div className="bg-red-950/40 border-2 border-red-600/50 rounded-lg p-4 shadow-lg shadow-red-900/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Skull className="h-5 w-5 text-red-500 animate-pulse" />
          <h3 className="text-lg font-bold text-red-400">{city}</h3>
        </div>
        <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
      </div>
      <div className="flex items-center gap-2 bg-red-900/30 p-2 rounded-md">
        <Activity className="h-4 w-4 text-red-400" />
        <span className="text-sm text-red-200">
          Уровень радиации: {radiationData.level} мкР/час
        </span>
      </div>
      <div className="mt-2 text-xs text-red-400/70">
        Последнее обновление: {radiationData.lastUpdate}
      </div>
    </div>
  );
};

export default RadiationMonitor;
