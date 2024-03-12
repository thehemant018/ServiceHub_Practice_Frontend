
//8 march
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// const Order = () => {
//   // const [profs, setProfs] = useState([]);
//   // useEffect(() => {
//   //   // Function to fetch professional data
//   //   const fetchProfsData = async () => {
//   //     try {
//   //       const response = await fetch(`http://localhost:1818/api/prof/getprofs`, {
//   //         method: "GET",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           "auth-token": localStorage.getItem('token')
//   //         },
//   //       });

//   //       if (!response.ok) {
//   //         throw new Error(`Error: ${response.status} - ${response.statusText}`);
//   //       }

//   //       const data = await response.json();
//   //       // console.log('API Response:', data); // Log the response

//   //       setProfs(data);
//   //     } catch (error) {
//   //       console.error('Error fetching professional data:', error.message);
//   //     }
//   //   };


//   //   // Call the function to fetch data when the component mounts
//   //   fetchProfsData();
//   // }, []);

//   const [serviceRequests, setServiceRequests] = useState([]);

//   useEffect(() => {
//     const fetchServiceRequests = async () => {
//       try {
//         const response = await fetch('http://localhost:1818/api/prof/fetchservicerequests');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setServiceRequests(data);
//       } catch (error) {
//         console.error('Error fetching service requests:', error.message);
//       }
//     };

//     fetchServiceRequests();
//   }, []);

//   const acceptServiceRequest = async (requestId) => {
//     try {
//       const response = await fetch(`http://localhost:1818/api/prof/acceptservice/${requestId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       // Update the serviceRequests state after accepting the request
//       const updatedServiceRequests = serviceRequests.map((request) => {
//         if (request._id === requestId) {
//           return { ...request, status: 'accepted' }; // Assuming there's a status field in your service request
//         }
//         return request;
//       });

//       setServiceRequests(updatedServiceRequests);

//       console.log('Service request accepted successfully');
//     } catch (error) {
//       console.error('Error accepting service request:', error.message);
//     }
//   };



//   return (
//     <>
//       {/* <div className="card" style={{width: "18rem"}}>
//         <div className="card-body">
//           <h3 className="card-title">{profs.name}</h3>
//           <h5 className="card-text">{profs.email}</h5>
//           <h5 className="card-text">{profs.category}</h5>
//           <Link to="/" className="btn btn-primary">Book Service</Link>
//         </div>
//       </div> */}

//       <div>
//         <h1>Service Requests</h1>
//         <ul>
//           {serviceRequests.map((request) => (
//             <li key={request._id}>
//               <p>Request ID: {request._id}</p>
//               <p>Status: {request.status}</p>
//               <button onClick={() => acceptServiceRequest(request._id)}>Accept Request</button>
//             </li>
//           ))}
//         </ul>
//       </div>


//     </>
//   );
// };

// export default Order;


//10march

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Order = () => {
//   const [serviceRequests, setServiceRequests] = useState([])

//   useEffect(() => {
//     const fetchServiceRequests = async () => {
//       try {
//         const response = await fetch('http://localhost:1818/api/prof/fetchorderrequest');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();

//         setServiceRequests(data);
//       } catch (error) {
//         console.error('Error fetching service requests:', error.message);
//       }
//     };

//     fetchServiceRequests();
//   }, []);

//   const acceptServiceRequest = async (requestId) => {
//     try {
//       const response = await fetch(`http://localhost:1818/api/prof/acceptservice/${requestId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       // Update the serviceRequests state after accepting the request
//       const updatedServiceRequests = serviceRequests.map((request) => {
//         if (request._id === requestId) {
//           return { ...request, status: 'accepted' }; // Assuming there's a status field in your service request
//         }
//         return request;
//       });

//       setServiceRequests(updatedServiceRequests);

//       console.log('Service request accepted successfully');
//     } catch (error) {
//       console.error('Error accepting service request:', error.message);
//     }
//   };

//   return (
//     <>
//       <div>
//         <h1>Service Requests</h1>
//         <ul>
//           {serviceRequests .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((request) => (
//             <li key={request._id}>
//               <p>Request ID: {request._id}</p>
//               <p>Status: {request.status}</p>
//               <p>Time: {request.createdAt}</p>
//               <p>Customer: {request.customerId}</p>
//               <p>CustomerName: {request.customerName}</p>
//               <p>Professional: {request.professionalId}</p>
//               <button onClick={() => acceptServiceRequest(request._id)}>Accept Request</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Order;



//11March


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Order = () => {
//   const [serviceRequests, setServiceRequests] = useState([])

//   useEffect(() => {
//     const fetchServiceRequests = async () => {
//       try {
//         const response = await fetch('http://localhost:1818/api/prof/fetchorderrequest',{
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();

//         setServiceRequests(data);
//       } catch (error) {
//         console.error('Error fetching service requests:', error.message);
//       }
//     };

//     fetchServiceRequests();
//   }, []);

//   const acceptServiceRequest = async (requestId) => {
//     try {
//       const response = await fetch(`http://localhost:1818/api/prof/acceptservice/${requestId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       // Update the serviceRequests state after accepting the request
//       const updatedServiceRequests = serviceRequests.map((request) => {
//         if (request._id === requestId) {
//           return { ...request, status: 'accepted' }; // Assuming there's a status field in your service request
//         }
//         return request;
//       });

//       setServiceRequests(updatedServiceRequests);

//       console.log('Service request accepted successfully');
//     } catch (error) {
//       console.error('Error accepting service request:', error.message);
//     }
//   };

//   return (
//     <>
//       <div>
//         <h1>Service Requests</h1>
//         <ul>
//           {serviceRequests .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((request) => (
//             <li key={request._id}>
//               <p>Request ID: {request._id}</p>
//               <p>Status: {request.status}</p>
//               <p>Time: {request.createdAt}</p>
//               <p>Customer: {request.customerId}</p>
//               <p>CustomerName: {request.customerName}</p>
//               <p>Professional: {request.professionalId}</p>
//               <button onClick={() => acceptServiceRequest(request._id)}>Accept Request</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Order;



//12march
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Order = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [prof, setProf] = useState({})
  // useEffect(() => {
  //   const fetchServiceRequests = async () => {
  //     try {
  //       const authToken = localStorage.getItem('token');
  //       // console.log(authToken)
  //       const response = await fetch('http://localhost:1818/api/prof/fetchorderrequest', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'auth-token': authToken,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       console.log(response)
  //       const data = await response.json();
  //       setServiceRequests(data);
  //     } catch (error) {
  //       console.error('Error fetching service requests:', error.message);
  //     }
  //   };

  //   fetchServiceRequests();
  // }, []);

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const authToken = localStorage.getItem('token');
        console.log(authToken)
        if (!authToken) {
          console.error('Authentication token not found in localStorage.');
          return;
        }
        console.log("leo")
        const response = await fetch('http://localhost:1818/api/prof/fetchorderrequest', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
          },
        });

        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          const errorText = await response.text();
          console.error('Error details:', errorText);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setServiceRequests(data);
      } catch (error) {
        console.error('Error fetching service requests:', error.message);
      }
    };

    const fetchProfProfile = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await fetch('http://localhost:1818/api/prof/getprofs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const profData = await response.json();
        setProf(profData);


      } catch (error) {
        console.error('Error fetching user profile:', error.message);

      }
    };

    fetchProfProfile();

    fetchServiceRequests();
  }, []);

  const acceptServiceRequest = async (requestId) => {
    try {
      const authToken = localStorage.getItem('token');

      const response = await fetch(`http://localhost:1818/api/prof/acceptservice/${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
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

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const authToken = localStorage.getItem('token');
            const response = await fetch('http://localhost:1818/api/prof/update-location', {
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
    <>
      <div>
          <h1>Professinal Details</h1>
        <div className='container'>
          <p>User ID: {prof._id}</p>
          <p>Username: {prof.name}</p>
          <p>Email: {prof.email}</p>
          <p>Category: {prof.category}</p>
          <p>Latitude: {prof.location && prof.location.coordinates ? prof.location.coordinates[1] : 'N/A'}</p>
          <p>Longitude: {prof.location && prof.location.coordinates ? prof.location.coordinates[0] : 'N/A'}</p>
        </div>
        <h1>Service Requests</h1>
        {/* {console.log(serviceRequests)} */}
        <ul>
          {serviceRequests
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((request) => (
              <li key={request._id}>
                <p>Request ID: {request._id}</p>
                <p>Status: {request.status}</p>
                <p>Time: {request.createdAt}</p>
                <p>Customer: {request.customerId}</p>
                <p>CustomerName: {request.customerName}</p>
                {/* <p>Customer Email: {request.email}</p> */}
                <p>Professional: {request.professionalId}</p>
                <button onClick={() => acceptServiceRequest(request._id)}>Accept Request</button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Order;
