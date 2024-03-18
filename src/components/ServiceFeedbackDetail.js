// ServiceFeedbackDetail.js
import React, { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Rating from './Rating';

// const ServiceFeedbackDetail = ({ service }) => {
const ServiceFeedbackDetail = () => {
    const navigate=useNavigate();
    const { id,userId,profId } = useParams();
    // console.log(userId)
    const [service, setService] = useState(null);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [ratingSaved, setRatingSaved] = useState(false);
    const [reviewsLeft, setReviewsLeft] = useState(2);

    useEffect(() => {
        const fetchServiceDetail = async () => {
            if (!id) {
                return; 
            }
            try {
                const response = await fetch(`http://localhost:1818/api/prof/fetchservicedetail/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const serviceData = await response.json();
                setService(serviceData);
            } catch (error) {
                console.error('Error fetching service detail:', error.message);
            }
        };
    
        fetchServiceDetail();
    }, [id]);
   
    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    const saveRating = async () => {
        try {
            // if (reviewsLeft <= 0) {
            //     alert('You have already submitted the maximum number of reviews.');
            //     return;
            //   }
            //   setReviewsLeft(reviewsLeft - 1);

            const response = await fetch('http://localhost:1818/api/prof/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: id,
                    userId:userId,
                    profId:profId,
                    rating: rating,
                    feedback: feedback,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save rating');
            }
            alert("Thank's for feedback")
            // If response is successful, set ratingSaved to true
            setRatingSaved(true);
        } catch (error) {
            console.error('Error saving rating:', error.message);
        }
    };
    if (!service) {
        return <div>Loading...</div>; // Add loading state until service data is fetched
    }
    if (ratingSaved) {
       navigate('/profile')
    }

   
    return (
        <div className="service-feedback-detail container">
            <h2>Service Feedback</h2>
            <p>Service Name: {service.serviceName}</p>
            <p>Professional Name: {service.professionalName}</p>
            <div>
                <h3>Rate the Service</h3>
                <Rating value={rating} onChange={handleRatingChange} />
                <textarea
                    placeholder="Your feedback"
                    value={feedback}
                    onChange={handleFeedbackChange}
                ></textarea>
                <button onClick={saveRating}>Submit Rating</button>
            </div>
        </div>
    );
};

export default ServiceFeedbackDetail;
