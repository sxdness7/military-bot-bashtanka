
import React from 'react';
import { AlertTriangle, Check, Clock } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

type AlertStatusProps = {
  active: boolean;
  startTime?: string;
};

const AlertStatus = ({ active, startTime }: AlertStatusProps) => {
  return (
    <div className="grid-panel flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4 title-font flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-military-accent" />
        СТАТУС ВОЗДУШНОЙ ТРЕВОГИ
      </h2>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        {active ? (
          <>
            <StatusBadge status="alert" pulsing={true} className="text-base py-2 px-6">
              <AlertTriangle className="h-5 w-5" />
              ТРЕВОГА АКТИВНА
            </StatusBadge>
            
            {startTime && (
              <div className="flex items-center gap-2 text-sm text-military-accent mt-2">
                <Clock className="h-4 w-4" />
                <span>Началась в {startTime}</span>
              </div>
            )}
            
            <p className="text-sm text-center mt-2 text-gray-300">
              Рекомендуется оставаться в укрытии до официального отбоя тревоги
            </p>
          </>
        ) : (
          <>
            <StatusBadge status="safe" className="text-base py-2 px-6">
              <Check className="h-5 w-5" />
              НЕТ ТРЕВОГИ
            </StatusBadge>
            
            <p className="text-sm text-center mt-2 text-gray-300">
              В данный момент воздушная тревога не объявлена
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AlertStatus;
