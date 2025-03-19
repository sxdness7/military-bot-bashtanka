
import React, { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, Thermometer, Wind, Droplets } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type WeatherInfoProps = {
  temperature: number;
  condition: 'clear' | 'cloudy' | 'rain' | 'storm';
  windSpeed: number;
  humidity: number;
};

type WeatherData = {
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

// Функция для получения погодных данных
const fetchWeatherData = async (): Promise<WeatherData> => {
  try {
    // Координаты Баштанки, Украина
    const lat = 47.4056;
    const lon = 32.4383;
    const apiKey = '4f8e795dcd6db4d124e1d85bdf9f3a26'; // Публичный ключ для демонстрации
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`
    );
    
    if (!response.ok) {
      throw new Error('Не удалось получить данные о погоде');
    }
    
    const data = await response.json();
    
    // Определяем состояние погоды
    let condition: 'clear' | 'cloudy' | 'rain' | 'storm' = 'clear';
    const weatherId = data.weather[0].id;
    
    if (weatherId >= 200 && weatherId < 300) {
      condition = 'storm';
    } else if ((weatherId >= 300 && weatherId < 600) || (weatherId >= 700 && weatherId < 800)) {
      condition = 'rain';
    } else if (weatherId === 800) {
      condition = 'clear';
    } else if (weatherId > 800) {
      condition = 'cloudy';
    }
    
    return {
      temperature: Math.round(data.main.temp),
      condition,
      windSpeed: Math.round(data.wind.speed),
      humidity: data.main.humidity
    };
  } catch (error) {
    console.error('Ошибка при получении данных о погоде:', error);
    toast({
      title: 'Ошибка',
      description: 'Не удалось получить актуальные данные о погоде',
      variant: 'destructive',
    });
    
    // Возвращаем значения по умолчанию
    return {
      temperature: 24,
      condition: 'clear',
      windSpeed: 3,
      humidity: 45
    };
  }
};

const WeatherInfo = ({ temperature, condition, windSpeed, humidity }: WeatherInfoProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature,
    condition,
    windSpeed,
    humidity
  });
  
  useEffect(() => {
    // Получаем актуальные данные при загрузке компонента
    const getWeatherData = async () => {
      const data = await fetchWeatherData();
      setWeatherData(data);
    };
    
    getWeatherData();
    
    // Обновляем данные каждые 30 минут
    const interval = setInterval(getWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="grid-panel h-full animate-scanner">
      <h2 className="text-lg font-semibold mb-4 title-font flex items-center gap-2">
        <Thermometer className="h-5 w-5 text-military-accent" />
        ПОГОДА
      </h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center">
          {weatherIcons[weatherData.condition]}
          <span className="mt-2 text-sm text-gray-300">{weatherLabels[weatherData.condition]}</span>
        </div>
        
        <div className="text-4xl font-bold mt-4 md:mt-0 text-white">
          {weatherData.temperature}°C
        </div>
        
        <div className="mt-4 md:mt-0 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-military-accent" />
            <div>
              <div className="text-sm text-gray-300">Ветер</div>
              <div className="font-semibold">{weatherData.windSpeed} м/с</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-military-accent" />
            <div>
              <div className="text-sm text-gray-300">Влажность</div>
              <div className="font-semibold">{weatherData.humidity}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
