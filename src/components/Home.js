//8 march
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [professionals, setProfessionals] = useState([]);
  const [category, setCategory] = useState('');
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);

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



//10 march
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

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log('Service booked successfully');
    alert('Service is Booked');
  } catch (error) {
    console.error('Error booking service:', error.message);
  }
};

  
 

 

  const fetchProfessionalsByCategory = async () => {
    try {
      const response = await fetch(`http://localhost:1818/api/prof/fetchprofessionalsbycategory/${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFilteredProfessionals(data); // Update the filter based on the selected category
    } catch (error) {
      console.error('Error fetching professionals by category:', error.message);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

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

      <ul className="list-unstyled d-flex justify-content-center flex-wrap">
        {filteredProfessionals.map(professional => (
          <li key={professional._id} className="mb-4 mx-4">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h3 className="card-title">{professional.name}</h3>
                <h5 className="card-text">{professional.email}</h5>
                <h5 className="card-text">{professional.category}</h5>
                <h5 className="card-text">{professional.contact}</h5>
                <h5 className="card-text">{professional._id}</h5>
                <button className='btn btn-primary' onClick={() => bookService(professional._id)}>Book</button>
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
