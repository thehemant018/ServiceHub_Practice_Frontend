import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    let navigate=useNavigate();
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;    //destructuring
        const response = await fetch(`http://localhost:1818/api/auth/createuser`, { 
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            //   "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3YjUxMWFiMDdkNmJkYWU3ZTEwN2FmIn0sImlhdCI6MTcwMjU4NDMzN30.MEsOPmUccsNnWm97V7pP5DHjiBjcjnzFei5HtTtmWIY"
            },
            body: JSON.stringify({name,email,password }),
          });
          const json=await response.json();
        //   console.log(json);
          if(json.success){
            //save the auth token and redirect
            
            localStorage.setItem('token',json.authToken);
            navigate("/");
            // props.showAlert('Account created successfuly','success')
           
          }
          else{
            alert("Invalid cedetials");
            // props.showAlert('Invalid cedetials','danger')
          }
         
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})      //... is spread operator
    }
    return (
      <div className='container mt-2'>
      <h2 className='my-2'>Create an account to use  iNotebook</h2>
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
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5}   required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
