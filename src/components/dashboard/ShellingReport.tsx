
import React from 'react';
import { Bomb, Calendar, Clock, MapPin } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

type ShellingEvent = {
  id: number;
  date: string;
  time: string;
  location: string;
  description: string;
};

type ShellingReportProps = {
  events: ShellingEvent[];
  lastEvent?: string;
};

const ShellingReport = ({ events, lastEvent }: ShellingReportProps) => {
  return (
    <div className="grid-panel h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4 title-font flex items-center gap-2">
        <Bomb className="h-5 w-5 text-military-accent" />
        ОТЧЕТЫ ОБ ОБСТРЕЛАХ
      </h2>
      
      {lastEvent && (
        <div className="mb-4 flex items-center">
          <span className="text-sm mr-3">Последний обстрел:</span>
          <StatusBadge 
            status={
              new Date(lastEvent).getTime() > Date.now() - 24 * 60 * 60 * 1000
                ? 'warning'
                : 'neutral'
            }
          >
            {lastEvent}
          </StatusBadge>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto pr-2">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="relative mb-4 pl-6 pb-4 border-l border-military-light"
          >
            <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-military-accent transform -translate-x-1.5"></div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
              <h3 className="font-semibold text-white">{event.description}</h3>
              
              <div className="flex items-center gap-2 text-military-accent text-xs mt-1 md:mt-0">
                <Calendar className="h-3 w-3" />
                <span>{event.date}</span>
                <Clock className="h-3 w-3 ml-1" />
                <span>{event.time}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <MapPin className="h-3 w-3" />
              <span>{event.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShellingReport;
