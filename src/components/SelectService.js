import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SelectService = () => {
    const { id } = useParams();
    const [professional, setProfessional] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchProfessional = async () => {
            try {
                const response = await fetch(`http://localhost:1818/api/prof/profdetail/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setProfessional(data);
            } catch (error) {
                console.error('Error fetching professional details:', error.message);
            }
        };

        fetchProfessional();
    }, [id]);


    const handleBookService = async () => {
        try {
            const authToken = localStorage.getItem('token');
            const response = await fetch(`http://localhost:1818/api/prof/bookservice/${id}`, {
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

            navigate('/');
        } catch (error) {
            console.error('Error booking service:', error.message);
        }
    };

    const handleNavigateToHome = () => {
        navigate('/');
    };

    if (!professional) {
        return <div>Loading...</div>; // or some loading indicator
    }

    return (
        <div className="container" >
            <div >
                <h2>Service Details</h2>
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">{professional.name}</h3>
                        <p>Email: {professional.email}</p>
                        <p>Category: {professional.category}</p>
                        <p>Permanent Address: {professional.address}</p>
                        <p>City: {professional.city}</p>
                        <button className="btn btn-primary" onClick={handleBookService}>
                            Book Service
                        </button>
                        <button className="btn btn-primary mx-3" onClick={handleNavigateToHome}>
                            Go Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectService;
