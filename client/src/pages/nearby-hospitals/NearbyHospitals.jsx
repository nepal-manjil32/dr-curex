import React, { useEffect, useState } from 'react';
import './NearbyHospitals.css';
import { MapPin, Activity, Navigation, AlertCircle, Loader, Search } from 'lucide-react';

function NearbyHospitals() {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [radius, setRadius] = useState(10); // Default 10km radius
  const [searchTriggered, setSearchTriggered] = useState(false);

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
        setSearchTriggered(true); // Auto-search on first load
      },
      () => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  }, []);

  // Fetch hospitals when location is set and search is triggered
  useEffect(() => {
    if (!location || !searchTriggered) return;

    const fetchHospitals = async () => {
      setLoading(true);
      setError(null);

      // Convert radius to approx. coordinate delta (rough approximation)
      // 0.01 degrees is approx 1.11km at the equator
      const delta = (radius * 0.01) / 1.11;
      
      // Nominatim search for hospitals near user location
      const lat = location.lat;
      const lon = location.lon;

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

        // Filter by actual distance to ensure we only get hospitals within the radius
        const filtered = data
          .map((item) => ({
            ...item,
            distance: getDistanceFromLatLonInKm(
              lat,
              lon,
              parseFloat(item.lat),
              parseFloat(item.lon)
            ),
          }))
          .filter(item => item.distance <= radius)
          .sort((a, b) => a.distance - b.distance);

        setHospitals(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setSearchTriggered(false);
      }
    };

    fetchHospitals();
  }, [location, searchTriggered, radius]);

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

  // Open in Google Maps
  const openInMaps = (hospital) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      hospital.display_name
    )}`;
    window.open(url, '_blank');
  };

  // Format address for display
  const formatAddress = (fullAddress) => {
    const parts = fullAddress.split(',');
    return parts.slice(1, 5).join(',');
  };

  // Handle search button click
  const handleSearch = () => {
    setSearchTriggered(true);
    setSelectedHospital(null);
  };

  // Predefined radius options
  const radiusOptions = [
    { value: 2, label: '2 km' },
    { value: 5, label: '5 km' },
    { value: 10, label: '10 km' },
    { value: 25, label: '25 km' },
    { value: 50, label: '50 km' },
  ];

  if (!location && loading) {
    return (
      <div className="loading-container">
        <Loader className="loader-icon" />
        <p>Getting your location...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <AlertCircle className="error-icon" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="nearby-hospitals-container">
      <div className="hospitals-header">
        <Activity className="header-icon" />
        <h1>Nearby Hospitals & Health Services</h1>
      </div>
      
      <div className="search-controls">
        <div className="radius-selector">
          <label htmlFor="radius-select">Search radius:</label>
          <select 
            id="radius-select" 
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          >
            {radiusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button className="search-button" onClick={handleSearch}>
          <Search className="search-icon" />
          Search
        </button>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <Loader className="loader-icon" />
          <p>Searching for hospitals within {radius} km...</p>
        </div>
      ) : (
        <>
          {hospitals.length === 0 ? (
            <div className="no-results">
              <p>No hospitals found within {radius} km of your location.</p>
              <p className="sub-message">Try increasing your search radius or check your location settings.</p>
            </div>
          ) : (
            <>
              <div className="result-count">
                Found <span>{hospitals.length}</span> health facilities within {radius} km
              </div>
              
              <ul className="hospital-list">
                {hospitals.map((hospital) => (
                  <li 
                    key={hospital.place_id} 
                    className={`hospital-card ${selectedHospital === hospital.place_id ? 'selected' : ''}`}
                    onClick={() => setSelectedHospital(hospital.place_id)}
                  >
                    <div className="hospital-content">
                      <h3>{hospital.display_name.split(',')[0]}</h3>
                      <p className="hospital-address">
                        <MapPin className="card-icon" />
                        {formatAddress(hospital.display_name)}
                      </p>
                      <div className="hospital-meta">
                        <span className="distance">
                          <Navigation className="card-icon" />
                          {hospital.distance.toFixed(1)} km away
                        </span>
                      </div>
                    </div>
                    <button 
                      className="directions-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openInMaps(hospital);
                      }}
                    >
                      Get Directions
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default NearbyHospitals;