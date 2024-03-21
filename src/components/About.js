import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const About = () => {
  const navigate=useNavigate();
  const [query, setQuery] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:1818/api/query/upload-query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query)
    });
    const json = await response.json();
    if (json.message === 'Query uploaded successfully') {
      alert("Query uploaded successfully");
      navigate('/about')
    } else {
      alert("Error uploading query");
    }
  };

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };
  return (
    <>
      About Us: Team Name :HAWKS<br />
      <b>Hemant Maurya</b><br /><b>Darshit Yadav</b><br /><b>Adarsh patel</b>

      <div className='container mt-4'>
        <h2 className='my-2'>Submit Your Query</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstName" name="firstName" value={query.firstName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastName" name="lastName" value={query.lastName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={query.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input type="text" className="form-control" id="phone" name="phone" value={query.phone} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" name="message" value={query.message} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default About
