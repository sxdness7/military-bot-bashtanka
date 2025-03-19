
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import StatusPanel from '@/components/dashboard/StatusPanel';
import AlertStatus from '@/components/dashboard/AlertStatus';
import WeatherInfo from '@/components/dashboard/WeatherInfo';
import NewsFeed from '@/components/dashboard/NewsFeed';
import ShellingReport from '@/components/dashboard/ShellingReport';

// Mock data for demonstration
const mockNews = [
  {
    id: 1,
    title: 'Восстановление водоснабжения в северном районе',
    date: '12.08.2023',
    source: 'Баштанка Онлайн',
    summary: 'После ремонтных работ восстановлено водоснабжение в северном районе города. Работы были завершены раньше запланированного срока.'
  },
  {
    id: 2,
    title: 'Открытие нового пункта выдачи гуманитарной помощи',
    date: '10.08.2023',
    source: 'Городская администрация',
    summary: 'На улице Мира открылся новый пункт выдачи гуманитарной помощи. График работы: 9:00-17:00, кроме воскресенья.'
  },
  {
    id: 3,
    title: 'Плановое отключение электроэнергии',
    date: '08.08.2023',
    source: 'Энергетическая компания',
    summary: 'В связи с плановыми работами 14 августа с 10:00 до 15:00 будет отключена электроэнергия по улицам Садовая, Ленина и Гагарина.'
  },
  {
    id: 4,
    title: 'Ремонт дороги на улице Центральной',
    date: '05.08.2023',
    source: 'Городская администрация',
    summary: 'Начат ремонт дорожного покрытия на улице Центральной. Работы планируется завершить через две недели.'
  }
];

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
  
  // Simulate real-time updates
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <NewsFeed news={mockNews} />
          
          <ShellingReport 
            events={mockShellingEvents} 
            lastEvent="03.08.2023"
          />
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-400">
        <div className="container mx-auto">
          <p>
            Баштанка Телеграм Бот © 2023 | Информационная система мониторинга
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
