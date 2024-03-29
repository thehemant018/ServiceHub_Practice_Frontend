import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:1818/api/admin/createadmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            alert('signup successfuly')
            const data = await response.json();
            console.log(data); // Handle response data as needed
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleAdminLogin = () => {
        navigate('/admin-login'); // Navigate to admin login page
    };


    return (
        <div>
            <h2>Admin Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handleChange} required />
                </div>
                <button type="submit">Signup</button>
                <button type="button" onClick={handleAdminLogin}>Admin Login</button>
            </form>
        </div>
    );
};

export default AdminSignup;
