import React, { useState } from "react";
import axios from 'axios'
import "../styles/login.css"
import Cookies from 'universal-cookie';

import { useHistory } from "react-router-dom";
import axiosClient from "../Apis/api"
import { Nologin, Yeslogin } from './modals/notification.js'


const cookies = new Cookies();
const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedin, setIsLoggedin] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axiosClient.post('api/login', {email, password})
  .then(response => {
    // cookies.set('username', response.data.name);
    // cookies.set('userID', response.data._id);
    Yeslogin()

  setIsLoggedin(cookies.get('accesstoken'))
  
   history.push('/dashboard')
   window.location.reload(false);
})
.catch( (error) => {
  Nologin()
 });
 if(isLoggedin) {
   history.push('/dashboard')
 }
 
  }
 

 
  return (

    <div className="container">
    <div className="screen">
      <div className="screen__content">
        <form className="login">
          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input type="text" className="login__input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input type="password" className="login__input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button className="button login__submit" onClick={handleLogin}>
            <span className="button__text">Log In Now</span>
           
          </button>	
        </form>
     
      </div>
      <div className="screen__background">
        <span className="screen__background__shape screen__background__shape4"></span>
        <span className="screen__background__shape screen__background__shape3"></span>		
        <span className="screen__background__shape screen__background__shape2"></span>
        <span className="screen__background__shape screen__background__shape1"></span>
      </div>		
    </div>
  </div>
  );
};

export default Login;