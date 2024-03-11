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
      // console.log('Booked services:', bookedServicesData);
      const sortedBookedServices = bookedServicesData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      // setBookedServices(bookedServicesData);
      setBookedServices(sortedBookedServices);
    } catch (error) {
      console.error('Error fetching booked services:', error);
    }
  };
  


  return (
    <div className='container'>
      <h1>User Profile</h1>
      <p>User ID: {user._id}</p>
      <p>Username: {user.name}</p>
      <p>Email: {user.email}</p>

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
