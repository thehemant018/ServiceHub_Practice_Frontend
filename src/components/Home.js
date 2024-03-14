//8 march
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [professionals, setProfessionals] = useState([]);
  const [category, setCategory] = useState('');
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [userLatitude, setUserLatitude] = useState();
  const [userLongtitude, setuserLongtitude] = useState();
  const [user, setUser] = useState({});
  const [city, setCity] = useState(''); // New state for selected city

  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchData = async () => {
    try {
      let apiUrl = 'http://localhost:1818/api/prof/fetchallprofessionals';

      // If a category is specified, append it to the API URL
      if (category) {
        apiUrl += `?category=${category}`;
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProfessionals(data);
      setFilteredProfessionals(data); // Reset the filter when new data is fetched
    } catch (error) {
      console.error('Error fetching professionals:', error.message);
    }
  };

  //befor 8 march
  // const bookService = async (professionalId) => {
  //   try {
  //     const response = await fetch(`http://localhost:1818/api/prof/bookservice/${professionalId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'auth-token': localStorage.getItem('token'),

  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     console.log('Service booked successfully');
  //     alert('Service is Booked');
  //   } catch (error) {
  //     console.error('Error booking service:', error.message);
  //   }
  // };



  //10 march (correct-14 march)
  // const bookService = async (professionalId) => {
  //   try {
  //     const authToken = localStorage.getItem('token');

  //     if (!authToken) {
  //       console.error('Authentication token not found');
  //       // Handle the case where the authentication token is missing
  //       return;
  //     }
  //     // console.log(authToken);
  //     const response = await fetch(`http://localhost:1818/api/prof/bookservice/${professionalId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'auth-token': authToken,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     console.log('Service booked successfully');
  //     alert('Service is Booked');
  //   } catch (error) {
  //     console.error('Error booking service:', error.message);
  //   }
  // };


  //14 march
  const bookService = async (professionalId) => {
    try {
      const authToken = localStorage.getItem('token');

      if (!authToken) {
        console.error('Authentication token not found');
        // Handle the case where the authentication token is missing
        return;
      }
      // console.log(authToken);
      const response = await fetch(`http://localhost:1818/api/prof/bookservice/${professionalId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });

      //14 march
      // const userResponse = await fetch('http://localhost:1818/api/auth/getuser', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'auth-token': authToken,
      //   },
      // });
      // const userData = await userResponse.json();
      // console.log("leoleo", userData)
      
      // const emailContent = `Dear ${userData.name}, your service with {professional.name} has been booked successfully.`;
  
      // let dataSend = {
      //   email: userData.email,
      //   subject: 'Service Booking Confirmation',
      //   message: emailContent,
      // };
  
      console.log('Service booked successfully');
      alert('Service is Booked');

      // await fetch('http://localhost:1818/api/prof/sendmail', {
      //   method: 'POST',
      //   headers: {
      //     Accept: "application/json",
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(dataSend),
      // });

      
     

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      
    } catch (error) {
      console.error('Error booking service:', error.message);
    }
  };


  //11 march
  // const fetchProfessionalsByCategory = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:1818/api/prof/fetchprofessionalsbycategory/${category}`);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setFilteredProfessionals(data); // Update the filter based on the selected category
  //   } catch (error) {
  //     console.error('Error fetching professionals by category:', error.message);
  //   }
  // };


  //12 march
  const fetchProfessionalsByCategory = async () => {
    try {
      const response = await fetch(`http://localhost:1818/api/prof/fetchprofessionalsbycategory/${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Calculate distance for each professional based on user's location
      const professionalsWithDistance = data.map(professional => {
        const profLatitude = professional.location && professional.location.coordinates ? professional.location.coordinates[1] : null;
        const profLongitude = professional.location && professional.location.coordinates ? professional.location.coordinates[0] : null;

        if (profLatitude && profLongitude) {
          const distance = calculateDistance(userLatitude, userLongtitude, profLatitude, profLongitude);
          return { ...professional, distance };
        } else {
          return professional;
        }
      });

      // Sort professionals by distance
      const sortedProfessionals = professionalsWithDistance.sort((a, b) => a.distance - b.distance);

      setFilteredProfessionals(sortedProfessionals); // Update the filter based on the sorted professionals
    } catch (error) {
      console.error('Error fetching professionals by category:', error.message);
    }
  };
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };


  //14 March
  const fetchProfessionalsByCity = async () => {
    try {
      const response = await fetch(`http://localhost:1818/api/prof/fetchprofessionalsbycity/${city}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFilteredProfessionals(data); // Update the filter based on the selected city
    } catch (error) {
      console.error('Error fetching professionals by city:', error.message);
    }
  };



  //12 March
  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const authToken = localStorage.getItem('token');
  //       const response = await fetch('http://localhost:1818/api/auth/getuser' || 'http://localhost:1818/api/prof/getprofs', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'auth-token': authToken,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const userData = await response.json();
  //       setUser(userData);
  //       setUserLatitude(userData.location.coordinates[1]);
  //       setuserLongtitude(userData.location.coordinates[0]);

  //     } catch (error) {
  //       console.error('Error fetching user profile:', error.message);

  //     }
  //   };

  //   fetchUserProfile();
  // }, []);
  // console.log(userLatitude);
  // console.log(userLongtitude);


  //12 march part2
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

        // If the first API request fails, try the second one
        if (!response.ok) {
          // console.log('Error fetching user profile. Trying the second API endpoint.');
          const responseSecond = await fetch('http://localhost:1818/api/prof/getprofs', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': authToken,
            },
          });

          if (!responseSecond.ok) {
            throw new Error(`HTTP error! Status: ${responseSecond.status}`);
          }
          console.log('Successful');
          const userData = await responseSecond.json();
          setUser(userData);
          setUserLatitude(userData.location.coordinates[1]);
          setuserLongtitude(userData.location.coordinates[0]);
        } else {
          const userData = await response.json();
          setUser(userData);
          setUserLatitude(userData.location.coordinates[1]);
          setuserLongtitude(userData.location.coordinates[0]);
        }

      } catch (error) {
        console.error('Error fetching user profile:', error.message);

      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <div className="mb-4 mx-4">
        <label htmlFor="categorySelect" className="form-label">Select Service:</label>
        <select
          className="form-select"
          id="categorySelect"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a service</option>
          <option value="Serviceman">Serviceman</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Pest">Pest</option>
          <option value="Wathchmen">Wathchmen</option>

          {/* Add other service options as needed */}
        </select>
        <button className='btn btn-primary' onClick={fetchProfessionalsByCategory}>Search</button>
      </div>

      {/* 14 march */}
      <div className="mb-4 mx-4">
        <label htmlFor="citySelect" className="form-label">Select City:</label>
        <select
          className="form-select"
          id="citySelect"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select a city</option>
          <option value="Anand">Anand</option>
          <option value="Ahmedabad">Ahmedabad</option>
          {/* Add other city options as needed */}
        </select>
        <button className='btn btn-primary' onClick={fetchProfessionalsByCity}>Search</button>
      </div>




      {/* <ul className="list-unstyled d-flex justify-content-center flex-wrap">
        {filteredProfessionals.map(professional => (
          <li key={professional._id} className="mb-4 mx-4">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h3 className="card-title">{professional.name}</h3>
                <h5 className="card-text">{professional.email}</h5>
                <h5 className="card-text">{professional.category}</h5>
                <h5 className="card-text">{professional.contact}</h5>
                <h5 className="card-text">{professional._id}</h5>
                <p>Latitude: {professional.location && professional.location.coordinates ? professional.location.coordinates[1] : 'N/A'}</p>
                <p>Longitude: {professional.location && professional.location.coordinates ? professional.location.coordinates[0] : 'N/A'}</p>

                <button className='btn btn-primary' onClick={() => bookService(professional._id)}>Book</button>
              </div>
            </div>
            <hr />
          </li>
        ))}
      </ul> */}

      <ul className="list-unstyled d-flex justify-content-center flex-wrap">
        {filteredProfessionals.map((professional) => (
          <li key={professional._id} className="mb-4 mx-4">
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h3 className="card-title">{professional.name}</h3>
                <h5 className="card-text">{professional.email}</h5>
                <h5 className="card-text">{professional.category}</h5>
                <h5 className="card-text">{professional.contact}</h5>
                <h5 className="card-text">{professional._id}</h5>
                <p>Latitude: {professional.location && professional.location.coordinates ? professional.location.coordinates[1] : 'N/A'}</p>
                <p>Longitude: {professional.location && professional.location.coordinates ? professional.location.coordinates[0] : 'N/A'}</p>

                <button className="btn btn-primary" onClick={() => bookService(professional._id)}>
                  Book
                </button>
              </div>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
