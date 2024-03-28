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
import ServiceFeedbackDetail from './components/ServiceFeedbackDetail';
import AdminPage from './components/AdminPage';
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup';
import Subscription from './components/Subscription';

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

        {/* 18 march */}
        <Route exact path="/service-feedback/:id/:userId/:profId" element={<ServiceFeedbackDetail />}></Route>

        {/* 19 march */}
        <Route exact path="/admin" element={<AdminPage />}></Route>
        <Route exact path="/admin-login" element={<AdminLogin />}></Route>
        <Route exact path="/admin-signup" element={<AdminSignup />}></Route>

        {/* 27 march */}
        <Route exact path="/payment" element={<Subscription />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

