import React, { useState, useEffect } from 'react';
const Home = () => {
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1818/api/prof/fetchallprofessionals');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProfessionals(data);
      } catch (error) {
        console.error('Error fetching professionals:', error.message);
      }
    };

    fetchData();
  }, []);

  // const BookService=()=>{
  //   console.log('Serviced Booked')
  // }

  const bookService = async (professionalId) => {
    try {
      const response = await fetch(`http://localhost:1818/api/prof/bookservice/${professionalId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can send additional data in the body if needed
        // body: JSON.stringify({ /* additional data */ }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Service booked successfully');
    } catch (error) {
      console.error('Error booking service:', error.message);
    }
  };

  return (
    <>
      {/* <div>
        <h1>All Professionals</h1>
        <ul>
          {professionals.map(professional => (
            <li key={professional._id}>
              <p>Name: {professional.name}</p>
              <p>Email: {professional.email}</p>
              <hr />
            </li>
          ))}
        </ul>
      </div> */}
      <div className="row mt-4">
        <ul className="list-unstyled d-flex justify-content-center flex-wrap">
          {professionals.map(professional => (
            <li key={professional._id} className="mb-4 mx-4">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h3 className="card-title">{professional.name}</h3>
                  <h5 className="card-text">{professional.email}</h5>
                  <h5 className="card-text">{professional.category}</h5>
                  <h5 className="card-text">{professional.contact}</h5>
                  {/* <button className='btn btn-primary' onClick={BookService}>Book</button> */}
                  <button className='btn btn-primary' onClick={() => bookService(professional._id)}>Book</button>
                </div>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Home
