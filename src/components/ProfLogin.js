import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const ProfLogin = () => {
    const [credentials, setCredentials] = useState({aadhar:"",password:""});
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:1818/api/prof/proflogin`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({aadhar:credentials.aadhar,password:credentials.password }),
          });
          const json=await response.json();
        //   console.log(json);
          if(json.success){
            //save the auth token and redirect
            // localStorage.setItem('token',json.authtoken);
            localStorage.setItem('token',json.authToken);
            navigate("/");
          }
          else{
            alert("Invalid cedetials");
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})      //... is spread operator
    }
  return (
    <>
          <div className='container mt-4'>
          <h2 className='my-2' >Login to continue to Servicehub</h2>
            {/* form will submit not submit button vakue so use onSubmit in from tag */}
            <form onSubmit={handleSubmit}>      
                <div className="mb-3">
                    <label htmlFor="aadhar" className="form-label">Aadharcard Number</label>
                    <input type="text" className="form-control" id="aadhar" value={credentials.aadhar} name="aadhar" aria-describedby="emailHelp" onChange={onChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your aadhar with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} name='password' onChange={onChange} required/>
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    </>
  )
}

export default ProfLogin
