import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Order = () => {
  // const [profs, setProfs] = useState([]);
  // useEffect(() => {
  //   // Function to fetch professional data
  //   const fetchProfsData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:1818/api/prof/getprofs`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "auth-token": localStorage.getItem('token')
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.status} - ${response.statusText}`);
  //       }

  //       const data = await response.json();
  //       // console.log('API Response:', data); // Log the response

  //       setProfs(data);
  //     } catch (error) {
  //       console.error('Error fetching professional data:', error.message);
  //     }
  //   };


  //   // Call the function to fetch data when the component mounts
  //   fetchProfsData();
  // }, []);

  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await fetch('http://localhost:1818/api/prof/fetchservicerequests');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setServiceRequests(data);
      } catch (error) {
        console.error('Error fetching service requests:', error.message);
      }
    };

    fetchServiceRequests();
  }, []);

  const acceptServiceRequest = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:1818/api/prof/acceptservice/${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the serviceRequests state after accepting the request
      const updatedServiceRequests = serviceRequests.map((request) => {
        if (request._id === requestId) {
          return { ...request, status: 'accepted' }; // Assuming there's a status field in your service request
        }
        return request;
      });

      setServiceRequests(updatedServiceRequests);

      console.log('Service request accepted successfully');
    } catch (error) {
      console.error('Error accepting service request:', error.message);
    }
  };



  return (
    <>
      {/* <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h3 className="card-title">{profs.name}</h3>
          <h5 className="card-text">{profs.email}</h5>
          <h5 className="card-text">{profs.category}</h5>
          <Link to="/" className="btn btn-primary">Book Service</Link>
        </div>
      </div> */}

      <div>
        <h1>Service Requests</h1>
        <ul>
          {serviceRequests.map((request) => (
            <li key={request._id}>
              <p>Request ID: {request._id}</p>
              <p>Status: {request.status}</p>
              <button onClick={() => acceptServiceRequest(request._id)}>Accept Request</button>
            </li>
          ))}
        </ul>
      </div>


    </>
  );
};

export default Order;
