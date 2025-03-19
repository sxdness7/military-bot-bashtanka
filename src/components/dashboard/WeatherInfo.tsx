import React from 'react';

const WeatherInfo = ({ city }) => {
  // Sample weather data - replace with actual API call
  const weatherData = {
    temperature: 25,
    humidity: 60,
    windSpeed: 10,
  };

  // Placeholder for RadiationMonitor component - needs to be implemented separately
  const RadiationMonitor = ({ city }) => {
    const radiationLevel = Math.random() * 10; // Replace with actual radiation data
    return (
      <div className="mt-4">
        <h3 className="text-lg font-medium">Радиационный фон</h3>
        <p className="text-gray-600">Уровень радиации в {city}: {radiationLevel.toFixed(2)} мкЗв/ч</p>
      </div>
    );
  };


  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">{city}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-lg font-medium">Температура:</span>
          <span className="text-gray-600">{weatherData.temperature}°C</span>
        </div>
        <div>
          <span className="text-lg font-medium">Скорость ветра:</span>
          <span className="text-gray-600">{weatherData.windSpeed} м/с</span>
        </div>
        <div>
          <span className="text-lg font-medium">Влажность:</span>
          <span className="text-gray-600">{weatherData.humidity}%</span>
        </div>
      </div>

      <RadiationMonitor city={city} />
    </div>
  );
};

export default WeatherInfo;