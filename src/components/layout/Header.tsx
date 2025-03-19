
import React from 'react';
import { Shield, MapPin, Clock } from 'lucide-react';

const Header = () => {
  const formattedDate = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  
  const formattedTime = new Date().toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <header className="w-full p-4 military-panel backdrop-blur-md z-10 animate-slide-in-left">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-military-accent" />
          <div>
            <h1 className="text-2xl font-bold title-font text-white">БАШТАНСКИЙ ЦЕНТР МОНИТОРИНГА</h1>
            <div className="flex items-center gap-2 text-sm text-military-accent">
              <MapPin className="h-4 w-4" />
              <span>Николаевская область, Украина</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center gap-3 text-military-accent title-font">
          <Clock className="h-5 w-5" />
          <div className="text-right">
            <div className="text-sm">{formattedDate}</div>
            <div className="text-lg font-bold">{formattedTime}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
