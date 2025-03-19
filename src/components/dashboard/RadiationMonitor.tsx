
import React from 'react';
import { Activity } from 'lucide-react';

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

const RadiationMonitor = ({ city }: { city: string }) => {
  // Временные данные, в реальности нужно будет получать с API
  const radiationData: RadiationData = {
    level: city === 'Дублин' ? 12 : city === 'Алматы' ? 15 : city === 'Белград' ? 18 : 20,
    status: 'normal',
    lastUpdate: new Date().toLocaleString('ru-RU')
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      <Activity className="h-4 w-4 text-military-accent" />
      <span className="text-sm">
        Радиация: {radiationData.level} мкР/час
        <span className={`ml-2 ${radiationData.status === 'normal' ? 'text-green-500' : 'text-red-500'}`}>
          {radiationData.status === 'normal' ? '(норма)' : '(повышен)'}
        </span>
      </span>
    </div>
  );
};

export default RadiationMonitor;
