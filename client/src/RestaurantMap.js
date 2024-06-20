import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const MapViewAdjuster = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = locations.map(loc => [loc.location.coordinates[1], loc.location.coordinates[0]]);
      map.fitBounds(bounds, { padding: [50, 50] });  // add padding to zoom out slightly
    }
  }, [locations, map]);

  return null;
};

const RestaurantMap = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:5001/api/restaurants', {
        params: { latitude, longitude },
      });
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error searching for restaurants:', error);
      alert('Failed to search for restaurants');
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <button type="submit">Search Restaurants</button>
      </form>
      <MapContainer center={[latitude || 51.505, longitude || -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {restaurants.length > 0 && <MapViewAdjuster locations={restaurants} />}
        {restaurants.map((restaurant) => (
          <Marker key={restaurant._id} position={[restaurant.location.coordinates[1], restaurant.location.coordinates[0]]}>
            <Popup>
              {restaurant.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RestaurantMap;