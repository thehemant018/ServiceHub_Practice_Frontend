import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Professionals from './components/Professionals';
import ProfLogin from './components/ProfLogin';
import Order from './components/Order';
import Profile from './components/Profile';
import SelectService from './components/SelectService';

function App() {
  return (
    <>
     <BrowserRouter>
     <Nav/>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/profsignup" element={<Professionals />}></Route>
        <Route exact path="/proflogin" element={<ProfLogin />}></Route>
        <Route exact path="/orders" element={<Order />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        {/* 17 march */}
        <Route exact path="/service/:id" element={<SelectService/>} /> 
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
