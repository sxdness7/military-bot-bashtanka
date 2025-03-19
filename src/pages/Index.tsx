import React, { useEffect, useState, lazy, Suspense } from 'react';
import Header from '@/components/layout/Header';
import StatusPanel from '@/components/dashboard/StatusPanel';
import AlertStatus from '@/components/dashboard/AlertStatus';
import WeatherInfo from '@/components/dashboard/WeatherInfo';
import NewsFeed from '@/components/dashboard/NewsFeed';
import ShellingReport from '@/components/dashboard/ShellingReport';

const RadiationMap = lazy(() => import('@/components/dashboard/RadiationMap'));

// Резервные данные для новостей
const fallbackNews = [
  {
    id: 1,
    title: 'Загрузка новостей...',
    date: new Date().toLocaleDateString('ru-RU'),
    source: 'Система',
    summary: 'Пожалуйста, подождите, идет загрузка последних новостей.'
  }
];

// Резервные данные для обстрелов
const mockShellingEvents = [
  {
    id: 1,
    date: '03.08.2023',
    time: '15:42',
    location: 'Южная окраина города',
    description: 'Артиллерийский обстрел, повреждены жилые здания'
  },
  {
    id: 2,
    date: '28.07.2023',
    time: '10:15',
    location: 'Район промзоны',
    description: 'Разрыв снаряда, без жертв'
  },
  {
    id: 3,
    date: '15.07.2023',
    time: '23:30',
    location: 'Северный район, ул. Полевая',
    description: 'Удаленные взрывы, без попаданий в черте города'
  }
];

const Index = () => {
  const [currentTime, setCurrentTime] = useState('');

  // Обновление текущего времени
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <StatusPanel 
            alertActive={false} 
            internetStatus="online" 
            lastUpdate={currentTime} 
          />

          <AlertStatus 
            active={false} 
          />

          <WeatherInfo 
            temperature={24} 
            condition="clear" 
            windSpeed={3} 
            humidity={45} 
          />
        </div>

        

        <ShellingReport 
          events={mockShellingEvents} 
          lastEvent="03.08.2023"
        />
        <Suspense fallback={<div>Loading Map...</div>}>
          <RadiationMap 
            cities={[
              { name: 'Баштанка', radiation: 20 },
              { name: 'Дублин', radiation: 12 },
              { name: 'Алматы', radiation: 15 },
              { name: 'Белград', radiation: 18 }
            ]} 
          />
        </Suspense>
      </main>

      <footer className="py-4 text-center text-sm text-gray-400">
        <div className="container mx-auto">
          <p>
            Баштанка Телеграм Бот © 2025 | Информационная система мониторинга
          </p>
          <p className="mt-1 text-xs">
            Данные обновляются автоматически. Для экстренных ситуаций обращайтесь по телефону 101.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;