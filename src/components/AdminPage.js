


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const [dataToShow, setDataToShow] = useState([]);
    const [dataType, setDataType] = useState('users');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log(token)
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
            // console.log('leoleo')
            const response = await fetch('http://localhost:1818/api/admin/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });
            const json = await response.json();
            if (response.ok) {
                if (json.success) {
                    localStorage.setItem('token', json.authToken);
                    // navigate("/");
                }
                // console.log("loading", loading);
                // console.log("res", json);
                // console.log(dataType);
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
            } else if (dataType === 'subscription') {
                endpoint = 'http://localhost:1818/api/subscription/subscriptionsRequest';
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
            else if (dataType === 'subscription') {
                endpoint = 'http://localhost:1818/api/subscription/subscriptionsRequest';
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

    //28 march
    const handleAcceptSubscription = async (id) => {
        try {
            const response = await fetch(`http://localhost:1818/api/subscription/accept/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to accept subscription');
            }
            if (response.ok) {
                alert("Subscription confirmed")
            }
            fetchData(dataType);
        } catch (error) {
            console.error('Error accepting subscription:', error.message);
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
                        <label>
                            <input type="radio" value="subscription" checked={dataType === 'subscription'} onChange={handleRadioChange} />
                            Subscription Request
                        </label>
                    </div>
                    <div>
                        {/* 28 march */}
                        {/* <h3>{dataType === 'users' ? 'User Data' : 'Professional Data'}</h3> */}
                        <h3>{dataType === 'users' ? 'User Data' : dataType === 'professionals' ? 'Professional Data' : 'subscription'}</h3>
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
                                    {/* 28march */}
                                    {dataType === 'subscription' && (
                                        <button className='btn btn-primary' onClick={() => handleAcceptSubscription(dataItem._id)}>Accept Subscription</button>
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
