import { useEffect, useState } from "react";
import "./App.css";
import { success, error } from "./components/location";
import { haversine } from "./components/haversine";

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [places, setPlaces] = useState([]) as any[];
  const [distance, setDistance] = useState(0);
  let id: number = -1;

  useEffect(() => {
    const getCoords = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => success(position, setLat, setLon, id, setPlaces),
          error
        );
        id++;
      } else {
        alert("Could not get location");
      }
    };

    getCoords();

    const interval = setInterval(() => {
      getCoords();
    }, 5000);
    // Stops when Site reloads. Prevents mem leak
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    for (let i = 0; i < places.length; i++) {
      if (i > 0) {
        setDistance(
          haversine(
            places[i].lat,
            places[i].lon,
            places[i - 1].lat,
            places[i - 1].lon
          ) + Number(distance)
        );
      } else {
        setDistance(0);
      }
    }
  }, [places]);

  return (
    <>
      <div className="logo">
        <h1>🍃</h1>
      </div>
      <h1 id="lat">{lat}</h1>
      <h1 id="lon">{lon}</h1>
      <div className="places">
        {places.map((ort: any) => (
          <span key={ort.id}>
            Lat: {ort.lat}, Lon: {ort.lon} ID: {ort.id}
          </span>
        ))}
      </div>

      <div className="distance">
        <h2>{distance.toFixed(3)}km bewegt</h2>
        <h3>{Number(distance.toFixed(3)) * 1000} Meter</h3>
      </div>
    </>
  );
}

export default App;
