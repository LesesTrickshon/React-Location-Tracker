import { useEffect, useState } from "react";
import "./App.css";
import { success, error, places } from "./components/location";

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [id, setID] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => success(position, setLat, setLon, id, setID),
          error
        );
      } else {
        alert("Could not get location");
      }
    }, 10000);

    // Stops when Site reloads. Prevents mem leak
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="logo">
        <h1>🍃</h1>
      </div>
      <h1 id="lat">{lat}</h1>
      <h1 id="lon">{lon}</h1>
      <div className="places">
        {places.map((ort) => (
          <span key={ort.id}>
            Lat: {ort.lat}, Lon: {ort.lon}
          </span>
        ))}
      </div>
    </>
  );
}

export default App;
