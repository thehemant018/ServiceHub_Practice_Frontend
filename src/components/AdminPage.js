import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const [dataToShow, setDataToShow] = useState([]);
    const [dataType, setDataType] = useState('users'); // Default to users

    const handleRadioChange = (event) => {
        event.preventDefault();
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

    return (
        <div className="container">
            <h2>Admin Page</h2>
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
                {/* <ul className="list-group">
                    {dataToShow.map((dataItem, index) => (
                        <li key={index} className="list-group-item">
                            <div className="mb-2">
                                <strong>Name:</strong> {dataItem.name}
                            </div>
                            <div className="mb-2">
                                <strong>Email:</strong> {dataItem.email}
                            </div>
                            {Object.entries(dataItem)
                                .filter(([key]) => key !== 'location' &&  key !== 'name' && key !== 'email') // Exclude 'name' and 'email'
                                .map(([key, value]) => (
                                    <div key={key} className="mb-2">
                                        <strong>{key}: </strong>
                                        {JSON.stringify(value)}
                                    </div>
                                ))}
                                <button className='btn btn-primary' onClick={() => handleDelete(dataItem.id)}>Delete</button>
                        </li>
                    ))}
                </ul> */}
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

        </div>
    );
};

export default AdminPage;
