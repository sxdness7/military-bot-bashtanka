
import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface RadiationMapProps {
  cities: Array<{
    name: string;
    radiation: number;
  }>;
}

const cityCoordinates: { [key: string]: [number, number] } = {
  'Баштанка': [47.4067, 32.4375],
  'Дублин': [53.3498, -6.2603],
  'Алматы': [43.2220, 76.8512],
  'Белград': [44.7866, 20.4489],
  'Житомир': [50.2547, 28.6587],
};

const RadiationMap: React.FC<RadiationMapProps> = ({ cities }) => {
  const getRadiationColor = (level: number) => {
    if (level < 20) return '#4ade80';
    if (level < 50) return '#facc15';
    return '#ef4444';
  };

  return (
    <div className="w-full h-[400px] mt-8 rounded-lg overflow-hidden border-2 border-red-600/50">
      <MapContainer
        center={[47.4067, 32.4375]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {cities.map((city) => {
          const coords = cityCoordinates[city.name];
          if (!coords) return null;

          return (
            <Circle
              key={city.name}
              center={coords}
              radius={50000}
              pathOptions={{
                color: getRadiationColor(city.radiation),
                fillColor: getRadiationColor(city.radiation),
                fillOpacity: 0.5,
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold">{city.name}</h3>
                  <p>Радиация: {city.radiation} мкР/ч</p>
                </div>
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default RadiationMap;
