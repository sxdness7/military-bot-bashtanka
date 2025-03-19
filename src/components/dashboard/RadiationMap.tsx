
import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface City {
  name: string;
  radiation: number;
}

interface RadiationMapProps {
  cities: City[];
}

const cityCoordinates = {
  'Баштанка': [47.4067, 32.4375],
  'Дублин': [53.3498, -6.2603],
  'Алматы': [43.2220, 76.8512],
  'Белград': [44.7866, 20.4489]
};

const RadiationMap: React.FC<RadiationMapProps> = ({ cities }) => {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[47.4067, 32.4375]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
                color: city.radiation > 15 ? 'red' : 'green',
                fillColor: city.radiation > 15 ? 'red' : 'green',
                fillOpacity: 0.5
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
