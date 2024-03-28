import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PiChart from './PiChart';

const SelectService = () => {
    const { id } = useParams();
    const [professional, setProfessional] = useState(null);
    const navigate = useNavigate();
    const [ratingsData, setRatingsData] = useState({ 1: 0, 2: 0, 3: 1, 4: 0, 5: 0 });
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {

        const fetchProfessional = async () => {
            try {
                const response = await fetch(`http://localhost:1818/api/prof/profdetail/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setProfessional(data);
                setRatingsData(data.ratings);
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

            const responseData = await response.json();


            if (!response.ok) {
                if (response.status === 400 && responseData.error === 'Please subscribe to book services') {
                    alert('Please subscribe to book services');
                    navigate('/payment');
                }
                else if (response.status === 400 && responseData.error === 'Please wait a few minutes to approve the subscription') {
                    alert('Please wait a few minutes to approve the subscription!');
                    navigate('/payment');
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }

            if (response.ok) {
            console.log('Service booked successfully');
            alert('Service is Booked');
            navigate('/');
            }

            
        } catch (error) {
            console.error('Error booking service:', error.message);
        }
    };
    
    const fetchRatingsData = async () => {
        try {
            const response = await fetch(`http://localhost:1818/api/prof/ratings/${professional._id}`); 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setFeedback(data);
        } catch (error) {
            console.error('Error fetching ratings data:', error.message);
        }
    };

    const handleNavigateToHome = () => {
        navigate('/');
    };

    if (!professional) {
        return <div>Loading...</div>; // or some loading indicator
    }

    const ratingsArray = Object.entries(ratingsData).map(([rating, count]) => ({ rating: parseInt(rating), count }));

    return (
        <div className="container" >
            <div >
                <h2>Service Details</h2>
                <div style={{ width: '500px', height: '500px' }}>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">{professional.name}</h3>
                            <p>Email: {professional.email}</p>
                            <p>Category: {professional.category}</p>
                            <p>Permanent Address: {professional.address}</p>
                            <p>City: {professional.city}</p>
                            <PiChart data={ratingsArray} />
                            <button className="btn btn-primary" onClick={handleBookService}>
                                Book Service
                            </button>
                            <button className="btn btn-primary mx-3" onClick={handleNavigateToHome}>
                                Go Back to Home
                            </button>
                            <button className="btn btn-primary" onClick={fetchRatingsData}>
                                Fetch Ratings Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {feedback !== null && feedback.length > 0 && (
                <div>
                    <h2>Ratings Feedback</h2>
                    <ul>
                        {feedback.map((item, index) => (
                            <li key={index}>
                                <p>Comment: {item.feedback}</p>
                                <p>User ID: {item.userId}</p>
                                <p>Rating: {item.rating}</p>
                                <p>Created At: {item.createdAt}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SelectService;
