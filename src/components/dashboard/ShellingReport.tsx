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

type CityStatus = {
  city: string;
  lastAttack: string | null;
  radiationLevel: number | null;
};

type ShellingReportProps = {
  events: ShellingEvent[];
  lastEvent?: string;
  cityStatuses: CityStatus[];
};

const ShellingReport = ({ events, lastEvent, cityStatuses }: ShellingReportProps) => {

  const getCityStatusDisplay = (city: string): string => {
    const cityStatus = cityStatuses.find(s => s.city === city);
    if (cityStatus) {
      if (cityStatus.lastAttack) {
        return `Последняя атака: ${cityStatus.lastAttack}`;
      } else {
        return `Спокойно уже долгое время`;
      }
    }
    return "Нет данных";
  };

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

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Баштанка', 'Дублин', 'Алматы', 'Белград'].map((city) => (
          <div key={city} className="p-3 border border-military-border rounded-lg">
            <h3 className="font-medium mb-2">{city}</h3>
            <p className="text-sm text-gray-400">{getCityStatusDisplay(city)}</p>
            {/* Add radiation level display here if available in cityStatus */}
            {cityStatuses.find(s => s.city === city)?.radiationLevel && (
              <p className="text-sm text-gray-400">Уровень радиации: {cityStatuses.find(s => s.city === city)?.radiationLevel}</p>
            )}
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-4">Последние события</h3>
      <div className="space-y-4">
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