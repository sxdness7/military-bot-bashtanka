
import React from 'react';
import { Sun, Cloud, CloudRain, Thermometer, Wind, Droplets } from 'lucide-react';

type WeatherInfoProps = {
  temperature: number;
  condition: 'clear' | 'cloudy' | 'rain' | 'storm';
  windSpeed: number;
  humidity: number;
};

const weatherIcons = {
  clear: <Sun className="h-12 w-12 text-military-warning" />,
  cloudy: <Cloud className="h-12 w-12 text-military-neutral" />,
  rain: <CloudRain className="h-12 w-12 text-military-accent" />,
  storm: <CloudRain className="h-12 w-12 text-military-alert" />,
};

const weatherLabels = {
  clear: 'Ясно',
  cloudy: 'Облачно',
  rain: 'Дождь',
  storm: 'Гроза',
};

const WeatherInfo = ({ temperature, condition, windSpeed, humidity }: WeatherInfoProps) => {
  return (
    <div className="grid-panel h-full animate-scanner">
      <h2 className="text-lg font-semibold mb-4 title-font flex items-center gap-2">
        <Thermometer className="h-5 w-5 text-military-accent" />
        ПОГОДА
      </h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center">
          {weatherIcons[condition]}
          <span className="mt-2 text-sm text-gray-300">{weatherLabels[condition]}</span>
        </div>
        
        <div className="text-4xl font-bold mt-4 md:mt-0 text-white">
          {temperature}°C
        </div>
        
        <div className="mt-4 md:mt-0 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-military-accent" />
            <div>
              <div className="text-sm text-gray-300">Ветер</div>
              <div className="font-semibold">{windSpeed} м/с</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-military-accent" />
            <div>
              <div className="text-sm text-gray-300">Влажность</div>
              <div className="font-semibold">{humidity}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
