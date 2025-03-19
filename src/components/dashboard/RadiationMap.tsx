
import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const cityCoordinates = {
  'Баштанка': [47.4067, 32.4375],
  'Дублин': [53.3498, -6.2603],
  'Алматы': [43.2220, 76.8512],
  'Белград': [44.7866, 20.4489]
};

interface RadiationMapProps {
  cities: {
    name: string;
    radiation: number;
  }[];
}

const RadiationMap = ({ cities }: RadiationMapProps) => {
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
        {cities.map((city) => (
          <Circle
            key={city.name}
            center={cityCoordinates[city.name]}
            radius={50000}
            pathOptions={{
              color: getRadiationColor(city.radiation),
              fillColor: getRadiationColor(city.radiation),
              fillOpacity: 0.7
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{city.name}</h3>
                <p className="text-sm">Радиация: {city.radiation} мкР/час</p>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default RadiationMap;
