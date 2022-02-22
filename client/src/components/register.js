import React, { useState } from "react";
import axios from 'axios'
import "../styles/register.css"


const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
        console.log(name)
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
        console.log(email)
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
        console.log(password)
    };

    const handleRegister = (e) => {
        e.preventDefault();

        var data = JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        });

        var config = {
            method: 'post',
            url: 'http://localhost:5000/api/register',
            headers: { 
               'Content-Type': 'application/json'
              },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    return (

        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="register">
                        <div className="register__field">
                            <i className="register__icon fas fa-user"></i>
                            <input type="text" className="register__input" placeholder="Name" value={name} onChange={onChangeName} />
                        </div>
                        <div className="register__field">
                            <i className="register__icon fas fa-user"></i>
                            <input type="text" className="register__input" placeholder="Email" value={email} onChange={onChangeEmail} />
                        </div>
                        <div className="register__field">
                            <i className="register__icon fas fa-lock"></i>
                            <input type="password" className="register__input" placeholder="Password" value={password} onChange={onChangePassword} />
                        </div>
                        <button className="button register__submit" onClick={handleRegister}>
                            <span className="button__text">Sign up</span>

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

export default Register;