import React from 'react';
import { Activity, AlertTriangle } from 'lucide-react';

interface RadiationData {
  level: number; // мкР/час
  status: 'normal' | 'elevated' | 'dangerous';
  lastUpdate: string;
}

const getRadiationStatus = (level: number): 'normal' | 'elevated' | 'dangerous' => {
  if (level < 30) return 'normal';
  if (level < 50) return 'elevated';
  return 'dangerous';
};

const getStatusColor = (status: 'normal' | 'elevated' | 'dangerous'): string => {
  switch (status) {
    case 'normal': return 'border-green-500';
    case 'elevated': return 'border-yellow-500';
    case 'dangerous': return 'border-red-500';
    default: return '';
  }
};


const RadiationMonitor = ({ city }: { city: string }) => {
  // Временные данные, в реальности нужно будет получать с API
  const radiationData: RadiationData = {
    level: city === 'Дублин' ? 12 : city === 'Алматы' ? 15 : city === 'Белград' ? 18 : 20,
    status: getRadiationStatus(city === 'Дублин' ? 12 : city === 'Алматы' ? 15 : city === 'Белград' ? 18 : 20),
    lastUpdate: new Date().toLocaleString('ru-RU')
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor(radiationData.status)} backdrop-blur-sm`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-red-400">{city}</h3>
        <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
      </div>
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-red-400" />
        <span className="text-sm text-red-200">
          Уровень радиации: {radiationData.level} мкР/час
        </span>
      </div>
      <div className="mt-2 text-xs text-red-300">
        Последнее обновление: {radiationData.lastUpdate}
      </div>
    </div>
  );
};

export default RadiationMonitor;