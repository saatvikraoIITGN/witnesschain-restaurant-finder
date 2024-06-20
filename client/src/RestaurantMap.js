import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const RestaurantMap = () => {
  const [addLatitude, setAddLatitude] = useState('');
  const [addLongitude, setAddLongitude] = useState('');
  const [searchLatitude, setSearchLatitude] = useState('');
  const [searchLongitude, setSearchLongitude] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [pinPosition, setPinPosition] = useState(null);
  const [fitBounds, setFitBounds] = useState(false); 

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:5001/api/restaurants', {
        params: { latitude: searchLatitude, longitude: searchLongitude },
      });
      setRestaurants(response.data);
      setFitBounds(true);  // Set to true to fit bounds after search
      setPinPosition(null);
    } catch (error) {
      console.error('Error searching for restaurants:', error);
      alert('Failed to search for restaurants');
    }
  };

  const handleAddRestaurant = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/restaurants', {
        name: document.getElementById('restaurantName').value,
        latitude: addLatitude,
        longitude: addLongitude,
      });
      alert('Restaurant added successfully');
      setPinPosition(null);  // Clear the pin after adding the restaurant
    } catch (error) {
      console.error('Error adding restaurant:', error);
      alert('Failed to add restaurant');
    }
  };

  const MapViewAdjuster = ({ locations, fitBounds }) => {
    const map = useMap();

    useEffect(() => {
      if (fitBounds && locations.length > 0) {
        const bounds = locations.map(loc => [loc.location.coordinates[1], loc.location.coordinates[0]]);
        map.fitBounds(bounds, { padding: [50, 50] });  // Add padding to zoom out slightly
        setFitBounds(false);  // Reset fitBounds after adjusting the view
      }
    }, [locations, fitBounds, map]);

    return null;
  };

  const MapClickHandler = ({ setLatitude, setLongitude, setPinPosition }) => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLatitude(lat);
        setLongitude(lng);
        setPinPosition([lat, lng]);
      },
    });
    return null;
  };

  return (
    <div>
      <form onSubmit={handleAddRestaurant}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            id="restaurantName"
            required
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            value={addLatitude}
            onChange={(e) => setAddLatitude(parseFloat(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            value={addLongitude}
            onChange={(e) => setAddLongitude(parseFloat(e.target.value))}
            required
          />
        </div>
        <button type="submit">Add Restaurant</button>
      </form>
      <form onSubmit={handleSearch}>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            value={searchLatitude}
            onChange={(e) => setSearchLatitude(parseFloat(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            value={searchLongitude}
            onChange={(e) => setSearchLongitude(parseFloat(e.target.value))}
            required
          />
        </div>
        <button type="submit">Search Restaurants</button>
      </form>
      <MapContainer center={[searchLatitude || 51.505, searchLongitude || -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {restaurants.length > 0 && <MapViewAdjuster locations={restaurants} fitBounds={fitBounds} />}
        <MapClickHandler setLatitude={setAddLatitude} setLongitude={setAddLongitude} setPinPosition={setPinPosition} />
        {restaurants.map((restaurant) => (
          <Marker key={restaurant._id} position={[restaurant.location.coordinates[1], restaurant.location.coordinates[0]]}>
            <Popup>
              {restaurant.name}
            </Popup>
          </Marker>
        ))}
        {pinPosition && (
          <Marker position={pinPosition}>
            <Popup>
              New Restaurant Location
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default RestaurantMap;