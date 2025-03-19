import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ShellingEvent {
  id: number;
  city: string;
  lastAttack?: string;
  status: string;
}

const cityStatuses: ShellingEvent[] = [
  {
    id: 1,
    city: 'Баштанка',
    lastAttack: '2024-01-15',
    status: 'Спокойно уже 2 месяца'
  },
  {
    id: 2,
    city: 'Дублин',
    status: 'Нет военных действий'
  },
  {
    id: 3,
    city: 'Алматы',
    status: 'Нет военных действий'
  },
  {
    id: 4,
    city: 'Белград',
    status: 'Нет военных действий'
  }
];

const ShellingReport = () => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Отчет о безопасности городов</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cityStatuses.map((city) => (
            <div key={city.id} className="p-4 border rounded-lg">
              <h3 className="font-bold">{city.city}</h3>
              {city.lastAttack && (
                <p className="text-sm text-gray-600">
                  Последняя атака: {new Date(city.lastAttack).toLocaleDateString()}
                </p>
              )}
              <p className="text-sm mt-2">{city.status}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShellingReport;