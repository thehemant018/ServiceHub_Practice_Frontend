import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:1818/api/admin/loginadmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                if (data && data.authToken) {
                    localStorage.setItem('token', data.authToken); // Store token in local storage
                    navigate('/admin'); // Redirect to admin page
                } else {
                    console.error('Token not found in response:', data);
                    // Handle the case where token is not received
                }
            } else {
                console.error('Login failed:', data); // Log the error message received from the server
                // Handle login failure, display error message to the user, etc.
            }
        } catch (error) {
            console.error('Error:', error); // Log any unexpected errors
            // Handle unexpected errors, display error message to the user, etc.
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
