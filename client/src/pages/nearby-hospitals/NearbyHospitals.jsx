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
      const delta = 0.05; // ~10km

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


// import React, { useState, useEffect } from 'react';
// import './NearbyHospitals.css';

// const NearbyHospitals = () => {
//   const [hospitals, setHospitals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);

//   // Get user location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           });
//         },
//         (err) => {
//           setError('Please enable location access to find nearby hospitals');
//           setLoading(false);
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by this browser');
//       setLoading(false);
//     }
//   }, []);

//   // Fetch hospitals when location changes
//   useEffect(() => {
//     if (!userLocation) return;

//     const fetchHospitals = async () => {
//       try {
//         console.log(userLocation.lat,userLocation.lng);
//         const response = await fetch(
//           `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=16.463144939522493,80.5066214517561&radius=5000&type=hospital&key=AIzaSyDATTogfzV87IQKNPVmXYlZnOFnmmGEOQY`
//         );
        
//         if (!response.ok) throw new Error('Failed to fetch');
        
//         const data = await response.json();
//         setHospitals(data.results);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load hospitals. Please try again.');
//         setLoading(false);
//       }
//     };

//     fetchHospitals();
//   }, [userLocation]);

//   if (loading) return <div className="loading">Finding nearby hospitals...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="nearby-hospitals-container">
//       <h2>Nearby Health Services</h2>
//       <div className="hospitals-list">
//         {hospitals.map((hospital) => (
//           <div key={hospital.place_id} className="hospital-card">
//             <h3>{hospital.name}</h3>
//             <p className="address">{hospital.vicinity}</p>
//             <div className="hospital-info">
//               <span className="rating">
//                 Rating: {hospital.rating || 'N/A'}
//               </span>
//               <span className={`status ${hospital.business_status?.toLowerCase()}`}>
//                 {hospital.business_status || 'Status unknown'}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NearbyHospitals;
