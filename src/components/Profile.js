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
      <ul>
        {bookedServices.map((service) => (
          <li key={service._id}>
            <p>Service ID: {service._id}</p>
            <p>Service Name: {service.serviceName}</p>
            <p>Status: {service.status}</p>
            <p>Status: {service.createdAt}</p>
            {/* Add other service information here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
