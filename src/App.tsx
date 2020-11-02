import React, { useState, useEffect } from 'react';
import './App.css';
import { useLocalStorage } from './hooks';

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
const toRad = function (x: number) {
  return (x * Math.PI) / 180;
};

interface AppProps {}

function App({}: AppProps) {
  const [currentPosition, setPosition] = useState<Position>({} as Position);

  const [latitude, setLatitude] = useLocalStorage<number>(
    'referenceLatitude',
    0,
  );
  const [longitude, setLongitude] = useLocalStorage<number>(
    'referenceLongitude',
    0,
  );

  useEffect(() => {
    navigator.geolocation.watchPosition(function (position) {
      console.log(position);
      setPosition(position);
    });
  });

  let distance: number | undefined = undefined;

  if (latitude !== 0 && longitude !== 0 && currentPosition?.coords) {
    distance = calculateDistance(
      latitude,
      longitude,
      currentPosition.coords.latitude,
      currentPosition.coords.longitude,
    );
  }

  // Return the App component.
  return (
    <div className="App">
      <header className="App-header">
        Précision :{' '}
        {currentPosition?.coords && (
          <>
            {Math.round(currentPosition.coords.accuracy)}m
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${currentPosition.coords.latitude},${currentPosition.coords.longitude}`}
            >
              position
            </a>
          </>
        )}
        <button
          onClick={() => {
            if (currentPosition.coords !== undefined) {
              setLatitude(currentPosition.coords.latitude);
              setLongitude(currentPosition.coords.longitude);
            }
          }}
        >
          Sauvegarder
        </button>
        {distance !== undefined && (
          <p> distance : {Math.round(distance * 1000)}m</p>
        )}
      </header>
    </div>
  );
}

export default App;
