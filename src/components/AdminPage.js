// import React, { useState,useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const AdminPage = () => {
//     const [dataToShow, setDataToShow] = useState([]);
//     const [dataType, setDataType] = useState('users');
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [loading, setLoading] = useState(true);


//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             validateToken(token);
//         } else {
//             setIsLoggedIn(false);
//             setLoading(false);
//             setDataToShow([]);
//         }
//     }, []);

//     const validateToken = async (token) => {
//         try {
//             const response = await fetch('http://localhost:1818/api/admin/validate', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ token })
//             });
//             if (response.ok) {
//                 setIsLoggedIn(true);
//                 setLoading(false);
//                 fetchData(dataType);
//             } else {
//                 setIsLoggedIn(false);
//                 setLoading(false);
//                 setDataToShow([]);
//             }
//         } catch (error) {
//             console.error('Error validating token:', error.message);
//             setIsLoggedIn(false);
//             setLoading(false);
//             setDataToShow([]);
//         }
//     };


//     const handleRadioChange = (event) => {
//         event.preventDefault();
//         setDataType(event.target.value);
//         // fetchData(event.target.value);
//         if (isLoggedIn) {
//             fetchData(event.target.value);
//         }
//     };


//     const fetchData = async (dataType) => {
//         try {
//             let endpoint = '';
//             if (dataType === 'users') {
//                 endpoint = 'http://localhost:1818/api/auth/getallusers';
//             } else if (dataType === 'professionals') {
//                 endpoint = 'http://localhost:1818/api/prof/fetchallprofessionals';
//             }
//             const response = await fetch(endpoint, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to fetch data');
//             }
//             const data = await response.json();
//             setDataToShow(data);
//         } catch (error) {
//             console.error('Error fetching data:', error.message);
//             setDataToShow([]); // Clear data on error
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             let endpoint = '';
//             if (dataType === 'users') {
//                 endpoint = `http://localhost:1818/api/auth/deleteuser/${id}`;
//             } else if (dataType === 'professionals') {
//                 endpoint = `http://localhost:1818/api/prof/deleteprofessional/${id}`;
//             }
//             const response = await fetch(endpoint, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to delete data');
//             }
//             // After successful deletion, refetch data
//             fetchData(dataType);
//         } catch (error) {
//             console.error('Error deleting data:', error.message);
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         // <div className="container">
//         //     <h2>Admin Page</h2>
//         //     <div>
//         //         <label>
//         //             <input type="radio" value="users" checked={dataType === 'users'} onChange={handleRadioChange} />
//         //             Users
//         //         </label>
//         //         <label>
//         //             <input type="radio" value="professionals" checked={dataType === 'professionals'} onChange={handleRadioChange} />
//         //             Professionals
//         //         </label>
//         //     </div>
//         //     <div>
//         //         <h3>{dataType === 'users' ? 'User Data' : 'Professional Data'}</h3>
//         //         {/* <ul className="list-group">
//         //             {dataToShow.map((dataItem, index) => (
//         //                 <li key={index} className="list-group-item">
//         //                     <div className="mb-2">
//         //                         <strong>Name:</strong> {dataItem.name}
//         //                     </div>
//         //                     <div className="mb-2">
//         //                         <strong>Email:</strong> {dataItem.email}
//         //                     </div>
//         //                     {Object.entries(dataItem)
//         //                         .filter(([key]) => key !== 'location' &&  key !== 'name' && key !== 'email') // Exclude 'name' and 'email'
//         //                         .map(([key, value]) => (
//         //                             <div key={key} className="mb-2">
//         //                                 <strong>{key}: </strong>
//         //                                 {JSON.stringify(value)}
//         //                             </div>
//         //                         ))}
//         //                         <button className='btn btn-primary' onClick={() => handleDelete(dataItem.id)}>Delete</button>
//         //                 </li>
//         //             ))}
//         //         </ul> */}
//         //         <ul className="list-group">
//         //             {dataToShow.map((dataItem, index) => (
//         //                 <li key={index} className="list-group-item">
//         //                     <div className="mb-2">
//         //                         <strong>Name:</strong> {dataItem.name}
//         //                     </div>
//         //                     <div className="mb-2">
//         //                         <strong>Email:</strong> {dataItem.email}
//         //                     </div>
//         //                     {Object.entries(dataItem)
//         //                         .filter(([key]) => key !== 'location' && key !== 'name' && key !== 'email' && key !== 'id') // Exclude 'name', 'email', 'location', and 'id'
//         //                         .map(([key, value]) => (
//         //                             <div key={key} className="mb-2">
//         //                                 <strong>{key}: </strong>
//         //                                 {JSON.stringify(value)}
//         //                             </div>
//         //                         ))}
//         //                     <button className='btn btn-primary' onClick={() => handleDelete(dataItem._id)}>Delete</button>
//         //                     {dataType === 'professionals' && (
//         //                         <Link to={`/service/${dataItem._id}`} className="btn btn-primary mx-2">View Service</Link>
//         //                     )}

//         //                 </li>
//         //             ))}
//         //         </ul>
//         //     </div>

//         // </div>
//         <>
//              <div className="container">
//             <h2>Admin Page</h2>
//             {!isLoggedIn ? (
//                 <div className="please-login">
//                     <p>Please <Link to="/admin-login">login</Link> to view this page.</p>
//                 </div>
//             ) : (
//                 <>
//                     <div>
//                         <label>
//                             <input type="radio" value="users" checked={dataType === 'users'} onChange={handleRadioChange} />
//                             Users
//                         </label>
//                         <label>
//                             <input type="radio" value="professionals" checked={dataType === 'professionals'} onChange={handleRadioChange} />
//                             Professionals
//                         </label>
//                     </div>
//                     <div>
//                         <h3>{dataType === 'users' ? 'User Data' : 'Professional Data'}</h3>
//                         <ul className="list-group">
//                             {dataToShow.map((dataItem, index) => (
//                                 <li key={index} className="list-group-item">
//                                     <div className="mb-2">
//                                         <strong>Name:</strong> {dataItem.name}
//                                     </div>
//                                     <div className="mb-2">
//                                         <strong>Email:</strong> {dataItem.email}
//                                     </div>
//                                     {Object.entries(dataItem)
//                                         .filter(([key]) => key !== 'location' && key !== 'name' && key !== 'email' && key !== 'id') // Exclude 'name', 'email', 'location', and 'id'
//                                         .map(([key, value]) => (
//                                             <div key={key} className="mb-2">
//                                                 <strong>{key}: </strong>
//                                                 {JSON.stringify(value)}
//                                             </div>
//                                         ))}
//                                     <button className='btn btn-primary' onClick={() => handleDelete(dataItem._id)}>Delete</button>
//                                     {dataType === 'professionals' && (
//                                         <Link to={`/service/${dataItem._id}`} className="btn btn-primary mx-2">View Service</Link>
//                                     )}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </>
//             )}
//         </div>
//         </>
//     );
// };

// export default AdminPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const [dataToShow, setDataToShow] = useState([]);
    const [dataType, setDataType] = useState('users');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        const fetchDataIfNeeded = async () => {
            if (token) {
                await validateToken(token);
            } else {
                setIsLoggedIn(false);
                setLoading(false);
            }
        };
    
        fetchDataIfNeeded(); 
    
    }, []);

    const validateToken = async (token) => {
        try {
            console.log('leoleo')
            const response = await fetch('http://localhost:1818/api/admin/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });
            const json=await response.json();
            if (response.ok) {
                if(json.success){
                    localStorage.setItem('token',json.authToken);
                    // navigate("/");
                  }
                  console.log("loading",loading);
                  console.log("res",json);
                  console.log(dataType);
                setIsLoggedIn(true);
                setLoading(false);
                fetchData(dataType); // Fetch data after successful login
            } else {
                setIsLoggedIn(false);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error validating token:', error.message);
            setIsLoggedIn(false);
            setLoading(false);
        }
    };

    const handleRadioChange = (event) => {
        setDataType(event.target.value);
        fetchData(event.target.value);
    };

    const fetchData = async (dataType) => {
        try {
            let endpoint = '';
            if (dataType === 'users') {
                endpoint = 'http://localhost:1818/api/auth/getallusers';
            } else if (dataType === 'professionals') {
                endpoint = 'http://localhost:1818/api/prof/fetchallprofessionals';
            }
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setDataToShow(data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setDataToShow([]); // Clear data on error
        }
    };

    const handleDelete = async (id) => {
        try {
            let endpoint = '';
            if (dataType === 'users') {
                endpoint = `http://localhost:1818/api/auth/deleteuser/${id}`;
            } else if (dataType === 'professionals') {
                endpoint = `http://localhost:1818/api/prof/deleteprofessional/${id}`;
            }
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete data');
            }
            // After successful deletion, refetch data
            fetchData(dataType);
        } catch (error) {
            console.error('Error deleting data:', error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>Admin Page</h2>
            {!isLoggedIn ? (
                <div className="please-login">
                    <p>Please <Link to="/admin-login">login</Link> to view this page.</p>
                </div>
            ) : (
                <>
                    <div>
                        <label>
                            <input type="radio" value="users" checked={dataType === 'users'} onChange={handleRadioChange} />
                            Users
                        </label>
                        <label>
                            <input type="radio" value="professionals" checked={dataType === 'professionals'} onChange={handleRadioChange} />
                            Professionals
                        </label>
                    </div>
                    <div>
                        <h3>{dataType === 'users' ? 'User Data' : 'Professional Data'}</h3>
                        <ul className="list-group">
                            {dataToShow.map((dataItem, index) => (
                                <li key={index} className="list-group-item">
                                    <div className="mb-2">
                                        <strong>Name:</strong> {dataItem.name}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Email:</strong> {dataItem.email}
                                    </div>
                                    {Object.entries(dataItem)
                                        .filter(([key]) => key !== 'location' && key !== 'name' && key !== 'email' && key !== 'id') // Exclude 'name', 'email', 'location', and 'id'
                                        .map(([key, value]) => (
                                            <div key={key} className="mb-2">
                                                <strong>{key}: </strong>
                                                {JSON.stringify(value)}
                                            </div>
                                        ))}
                                    <button className='btn btn-primary' onClick={() => handleDelete(dataItem._id)}>Delete</button>
                                    {dataType === 'professionals' && (
                                        <Link to={`/service/${dataItem._id}`} className="btn btn-primary mx-2">View Service</Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminPage;
