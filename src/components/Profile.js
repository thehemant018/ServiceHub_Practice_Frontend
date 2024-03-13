// Profile.js

//11 march
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const [user, setUser] = useState({});
//   const [bookedServices, setBookedServices] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const authToken = localStorage.getItem('token');
//         const response = await fetch('http://localhost:1818/api/auth/getuser', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'auth-token': authToken,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const userData = await response.json();
//         setUser(userData);

//         // Fetch the user's booked services after fetching the user profile
//         fetchUserBookedServices(userData._id, authToken);
//       } catch (error) {
//         console.error('Error fetching user profile:', error.message);
//         navigate('/error');
//       }
//     };

//     fetchUserProfile();
//   }, [navigate]);

//   const fetchUserBookedServices = async (userId, authToken) => {
//     try {
//       console.log('Fetching booked services for user ID:', userId);
  
//       const response = await fetch(`http://localhost:1818/api/prof/booked-services/${userId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'auth-token': authToken,
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const bookedServicesData = await response.json();
//       // console.log('Booked services:', bookedServicesData);
//       const sortedBookedServices = bookedServicesData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       // setBookedServices(bookedServicesData);
//       setBookedServices(sortedBookedServices);
//     } catch (error) {
//       console.error('Error fetching booked services:', error);
//     }
//   };
  


//   return (
//     <div className='container'>
//       <h1>User Profile</h1>
//       <p>User ID: {user._id}</p>
//       <p>Username: {user.name}</p>
//       <p>Email: {user.email}</p>
//       <p>Latitude: {user.location && user.location.coordinates ? user.location.coordinates[1] : 'N/A'}</p>
//       <p>Longitude: {user.location && user.location.coordinates ? user.location.coordinates[0] : 'N/A'}</p>
//       <h2>Booked Services History</h2>
//       <ul>
//         {bookedServices.map((service) => (
//           <li key={service._id}>
//             <p>Service ID: {service._id}</p>
//             <p>Service Name: {service.serviceName}</p>
//             <p>Status: {service.status}</p>
//             <p>Status: {service.createdAt}</p>
//             {/* Add other service information here */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Profile;


//12march
// Profile.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  const [bookedServices, setBookedServices] = useState([]);
  const navigate = useNavigate();
  const [serviceRequests, setServiceRequests] = useState([]);
  const today = new Date().toISOString().split('T')[0];
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await fetch('http://localhost:1818/api/auth/getuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        setUser(userData);

        // Fetch the user's booked services after fetching the user profile
        fetchUserBookedServices(userData._id, authToken);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
        navigate('/error');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const fetchUserBookedServices = async (userId, authToken) => {
    try {
      console.log('Fetching booked services for user ID:', userId);
  
      const response = await fetch(`http://localhost:1818/api/prof/booked-services/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const bookedServicesData = await response.json();
      const sortedBookedServices = bookedServicesData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBookedServices(sortedBookedServices);
    } catch (error) {
      console.error('Error fetching booked services:', error);
    }
  };
  
 
  const cancelServiceRequest = async (requestId) => {
    try {
      const authToken = localStorage.getItem('token');

      const response = await fetch(`http://localhost:1818/api/prof/cancelservice/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the bookedServices state after canceling the request
      const updatedBookedServices = bookedServices.map((service) => {
        if (service._id === requestId) {
          return { ...service, status: 'canceled' }; // Assuming there's a status field in your service request
        }
        return service;
      });

      setBookedServices(updatedBookedServices);
      alert('Service request canceled successfully');
      console.log('Service request canceled successfully');
    } catch (error) {
      console.error('Error canceling service request:', error.message);
    }
  };

  //13march
  const calculateDistance = (ulon,ulat, plon,plat) => {
    const earthRadius = 6371; // Earth radius in kilometers
  
    const userLat=ulat;
    const userLon=ulon;
    const profLat=plat;
    const profLon=plon;
    // const [userLat, userLon] = userCoordinates;
    // const [profLat, profLon] = professionalCoordinates;
  
    const dLat = (profLat - userLat) * (Math.PI / 180);
    const dLon = (profLon - userLon) * (Math.PI / 180);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userLat * (Math.PI / 180)) * Math.cos(profLat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadius * c; // Distance in kilometers
    return distance;
  };
  


  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const authToken = localStorage.getItem('token');
            const response = await fetch('http://localhost:1818/api/auth/update-location', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken,
              },
              body: JSON.stringify({
                latitude,
                longitude,
              }),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log('Location updated successfully!');
          } catch (error) {
            console.error('Error updating location:', error.message);
          }
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    // Update location when the component mounts (page reload)
    updateLocation();
  }, []);

  return (
    <div className='container'>
      <h1>User Profile</h1>
      <p>User ID: {user._id}</p>
      <p>Username: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Latitude: {user.location && user.location.coordinates ? user.location.coordinates[1] : 'N/A'}</p>
      <p>Longitude: {user.location && user.location.coordinates ? user.location.coordinates[0] : 'N/A'}</p>
      <h2>Booked Services History</h2>
      {/* 13 march */}
        {/* for display 5 services use slice */}
      {/* <ul>
        {bookedServices.slice(0, 5).map((service) => (
          <li key={service._id}>
            <p>Service ID: {service._id}</p>
            <p>Service Name: {service.serviceName}</p>
            <p>Professional Name: {service.professionalName}</p>
            <p>Status: {service.status}</p>
            <p>Status: {service.createdAt}</p>
            <p>Distance: {user.location ? calculateDistance(service.userlocation.coordinates[0],service.userlocation.coordinates[1],service.proflocation.coordinates[0],service.proflocation.coordinates[1]).toFixed(2) + ' km' : 'N/A'}</p>

            {serviceDate === today && service.status !== 'canceled' && (
              <button className='btn btn-primary mx-3' onClick={() => cancelServiceRequest(service._id)}>
                Cancel Request
              </button>
            )}

          </li>
        ))};
      </ul> */}

      {/* 14 march */}
      <ul>
      {bookedServices
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0,7)
      .map((service) => {
        const serviceDate = new Date(service.createdAt).toISOString().split('T')[0];

        return (
          <li key={service._id}>
            {/* ... service information */}
            <p>Service ID: {service._id}</p>
            <p>Service Name: {service.serviceName}</p>
            <p>Professional Name: {service.professionalName}</p>
            <p>Status: {service.status}</p>
            <p>Status: {service.createdAt}</p>
            <p>Distance: {user.location ? calculateDistance(service.userlocation.coordinates[0], service.userlocation.coordinates[1], service.proflocation.coordinates[0], service.proflocation.coordinates[1]).toFixed(2) + ' km' : 'N/A'}</p>
            
            {serviceDate === today && service.status !== 'canceled' && (
              <button className='btn btn-primary mx-3' onClick={() => cancelServiceRequest(service._id)}>
                Cancel Request
              </button>
            )}
          </li>
        );
      })}
    </ul>



    </div>
  );
};

export default Profile;
