//11 march
// import React,{useState} from 'react'
// import {Link, useNavigate} from 'react-router-dom'

// const Professionals = () => {
//     const [credentials, setCredentials] = useState({name:"",email:"",password:"",aadhar:"",category:""});
//     let navigate=useNavigate();

//     const handleSubmit=async (e)=>{
//         e.preventDefault();
//         const {name,email,password,aadhar,category}=credentials;    //destructuring
//         const response = await fetch(`http://localhost:1818/api/prof/profcreateuser`, { 
//             method: "POST", // *GET, POST, PUT, DELETE, etc.
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({name,email,password,aadhar,category }),
//           });
//           const json=await response.json();
//         //   console.log(json);
//           if(json.success){
//             //save the auth token and redirect
//             // localStorage.setItem('token',json.authToken);

//             navigate("/");
//             // props.showAlert('Account created successfuly','success')
//           }
//           else{
//             alert("Invalid cedetials");
//             // props.showAlert('Invalid cedetials','danger')
//           }

//     }
//     const onChange=(e)=>{
//         setCredentials({...credentials,[e.target.name]:e.target.value})      //... is spread operator
//     }
//     return (
//         <>
//             <div className='container mt-2'>
//                 <h2 className='my-2'>Create an account to use ServiceHub</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="name" className="form-label">Name</label>
//                         <input type="text" className="form-control" id="name" name='name' onChange={onChange} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">Email address</label>
//                         <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required />
//                         <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password" className="form-label">Password</label>
//                         <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="aadhar" className="form-label">Aadhar</label>
//                         <input type="text" className="form-control" id="aadhar" name='aadhar' onChange={onChange} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="category" className="form-label">Category</label>
//                         <input type="text" className="form-control" id="category" name='category' onChange={onChange} required />
//                     </div>

//                     <button type="submit" className="btn btn-primary">Submit</button>
//                     <Link className="btn btn-primary mx-4" to="/proflogin">Login</Link>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default Professionals





//12 march

import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Professionals = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", aadhar: "", category: "", city:"",address:"",latitude: "", longitude: "", });
    let navigate = useNavigate();

    useEffect(() => {
        // Function to get user's location using Geolocation API
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCredentials({
                            ...credentials,
                            latitude,
                            longitude,
                        });
                    },
                    (error) => {
                        console.error(error.message);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };

       
        getUserLocation();
    }, []); 


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, aadhar, category,city,address,latitude, longitude } = credentials;    //destructuring
        const response = await fetch(`http://localhost:1818/api/prof/profcreateuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, aadhar, category,city,address, latitude, longitude }),
        });
        const json = await response.json();
        //   console.log(json);
        if (json.success) {
            //save the auth token and redirect
            // localStorage.setItem('token',json.authToken);

            navigate("/proflogin");
            // props.showAlert('Account created successfuly','success')
        }
        else {
            alert("Invalid cedetials");
            // props.showAlert('Invalid cedetials','danger')
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })      //... is spread operator
    }
    return (
        <>
            <div className='container mt-2'>
                <h2 className='my-2'>Create an account to use ServiceHub</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="aadhar" className="form-label">Aadhar</label>
                        <input type="text" className="form-control" id="aadhar" name='aadhar' onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input type="text" className="form-control" id="category" name='category' onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" name='city' onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" name='address' onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="latitude" className="form-label">Latitude</label>
                        <input type="text" className="form-control" id="latitude" name='latitude' value={credentials.latitude} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="longitude" className="form-label">Longitude</label>
                        <input type="text" className="form-control" id="longitude" name='longitude' value={credentials.longitude} readOnly />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link className="btn btn-primary mx-4" to="/proflogin">Login</Link>
                </form>
            </div>
        </>
    )
}

export default Professionals
