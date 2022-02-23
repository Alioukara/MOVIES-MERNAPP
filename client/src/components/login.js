import React, { useState } from "react";
import axios from 'axios'
import "../styles/login.css"
import Cookies from 'universal-cookie';

import { useHistory } from "react-router-dom";


const cookies = new Cookies();
const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedin, setIsLoggedin] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
 
  axios.post('http://localhost:5000/api/login', {email, password}, { withCredentials: true })
    .then(function (response) {
      cookies.set('username', response.data.name);
      cookies.set('userID', response.data._id);
      console.log(response.data._id)
    console.log(response)
   
    setIsLoggedin(cookies.get('jwt'))
    
     history.push('/dashboard')
     window.location.reload(false);
     
    })
    .catch(function (error) {
     console.log(error)
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