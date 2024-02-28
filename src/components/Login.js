import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:1818/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            //   "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3YjUxMWFiMDdkNmJkYWU3ZTEwN2FmIn0sImlhdCI6MTcwMjU4NDMzN30.MEsOPmUccsNnWm97V7pP5DHjiBjcjnzFei5HtTtmWIY"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password }),
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
        <div className='container mt-4'>
          <h2 className='my-2' >Login to continue to Servicehub</h2>
            {/* form will submit not submit button vakue so use onSubmit in from tag */}
            <form onSubmit={handleSubmit}>      
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} name="email" aria-describedby="emailHelp" onChange={onChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} name='password' onChange={onChange} required/>
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
