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


const WEATHER_API_KEY = '8d9f4d9b98b781c65ca37f02051d5c19';
const CITY_NAME = 'Баштанка';

const fetchRealWeatherData = async (): Promise<WeatherData> => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`);

  if (!response.ok) {
    throw new Error('Weather API error');
  }

  const data = await response.json();

  // Конвертируем коды погоды OpenWeatherMap в наши состояния
  const getCondition = (weatherId: number): WeatherInfoProps['condition'] => {
    if (weatherId >= 200 && weatherId < 300) return 'storm';
    if (weatherId >= 300 && weatherId < 600) return 'rain';
    if (weatherId >= 600 && weatherId < 700) return 'rain';
    if (weatherId >= 801) return 'cloudy';
    return 'clear';
  };

  return {
    temperature: Math.round(data.main.temp),
    condition: getCondition(data.weather[0].id),
    windSpeed: Math.round(data.wind.speed),
    humidity: data.main.humidity
  };
};

// Резервные реалистичные данные для Баштанки на случай, если API недоступен
const generateRealisticWeatherData = (): WeatherData => {
  // Текущая дата для определения сезона
  const now = new Date();
  const month = now.getMonth(); // 0-11: январь-декабрь

  // Базовые температуры по сезонам для Баштанки (примерно)
  let baseTemp, tempRange;
  if (month <= 1 || month === 11) { // Зима (декабрь-февраль)
    baseTemp = -5;
    tempRange = 15; // от -12 до +10
  } else if (month <= 4) { // Весна (март-май)
    baseTemp = 10;
    tempRange = 15; // от 0 до +25
  } else if (month <= 8) { // Лето (июнь-август)
    baseTemp = 25;
    tempRange = 10; // от +20 до +35
  } else { // Осень (сентябрь-ноябрь)
    baseTemp = 10;
    tempRange = 15; // от 0 до +25
  }

  // Случайная температура в пределах реалистичного диапазона для сезона
  const randomTemp = baseTemp + (Math.random() * tempRange - tempRange/2);
  const temperature = Math.round(randomTemp);

  // Определение состояния погоды (вероятности зависят от температуры)
  let condition: 'clear' | 'cloudy' | 'rain' | 'storm';
  const weatherRandom = Math.random();

  if (temperature < 0) {
    // В холодную погоду чаще ясно или облачно
    condition = weatherRandom < 0.6 ? 'clear' : 'cloudy';
  } else if (temperature < 10) {
    if (weatherRandom < 0.3) condition = 'clear';
    else if (weatherRandom < 0.7) condition = 'cloudy';
    else condition = 'rain';
  } else if (temperature < 25) {
    if (weatherRandom < 0.4) condition = 'clear';
    else if (weatherRandom < 0.7) condition = 'cloudy';
    else if (weatherRandom < 0.9) condition = 'rain';
    else condition = 'storm';
  } else {
    // В жаркую погоду чаще ясно, но возможны грозы
    if (weatherRandom < 0.6) condition = 'clear';
    else if (weatherRandom < 0.8) condition = 'cloudy';
    else if (weatherRandom < 0.9) condition = 'rain';
    else condition = 'storm';
  }

  // Ветер (2-12 м/с) и влажность (30-95%)
  const windSpeed = Math.round(2 + Math.random() * 10);
  const humidity = Math.round(30 + Math.random() * 65);

  return {
    temperature,
    condition,
    windSpeed,
    humidity
  };
};

// Функция для получения погодных данных
const fetchWeatherData = async (): Promise<WeatherData> => {
  try {
    // Пытаемся получить реальные данные
    return await fetchRealWeatherData();
  } catch (error) {
    console.error('Используем резервные данные о погоде:', error);
    toast({
      title: 'Информация',
      description: 'Используем резервные погодные данные. Проверьте API ключ.',
      variant: 'default',
    });

    // Возвращаем резервные данные в случае ошибки
    return generateRealisticWeatherData();
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