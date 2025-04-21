import React, { useEffect, useState } from 'react';
import './NearbyHospitals.css';

function NearbyHospitals() {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  }, []);

  // Fetch hospitals when location is set
  useEffect(() => {
    if (!location) return;

    const fetchHospitals = async () => {
      setLoading(true);
      setError(null);

      // Nominatim search for hospitals near user location
      // We'll use a bounding box of ~0.05 degrees (~5km) around user location
      const lat = location.lat;
      const lon = location.lon;
      const delta = 0.1; // ~10km

      // Bounding box: left, top, right, bottom
      const viewbox = `${lon - delta},${lat + delta},${lon + delta},${lat - delta}`;

      const url = `https://nominatim.openstreetmap.org/search?format=json&amenity=hospital&limit=20&viewbox=${viewbox}&bounded=1`;

      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'DrCureX/1.0 (sunitsoni915@gmail.com)', // Required by Nominatim usage policy
            'Accept-Language': 'en',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch hospital data');
        }

        const data = await response.json();

        // Optional: sort by distance from user location
        const sorted = data
          .map((item) => ({
            ...item,
            distance: getDistanceFromLatLonInKm(
              lat,
              lon,
              parseFloat(item.lat),
              parseFloat(item.lon)
            ),
          }))
          .sort((a, b) => a.distance - b.distance);

        setHospitals(sorted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [location]);

  // Helper: Calculate distance between two lat/lon points in km
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  if (loading) return <div className="loading">Loading nearby hospitals...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="nearby-hospitals-container">
      <h2>Nearby Hospitals & Health Services</h2>
      {hospitals.length === 0 ? (
        <p>No hospitals found nearby.</p>
      ) : (
        <ul className="hospital-list">
          {hospitals.map((hospital) => (
            <li key={hospital.place_id} className="hospital-item">
              <h3>{hospital.display_name.split(',')[0]}</h3>
              <p>{hospital.display_name}</p>
              <p>
                Distance: {hospital.distance.toFixed(2)} km
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NearbyHospitals;
