import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowlogin }) => {
    const { url, setToken } = useContext(StoreContext);

    const [currentState, setCurrentState] = useState("Login");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        newUrl += currentState === "Login" ? "/api/user/login" : "/api/user/register";

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowlogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img
                        onClick={() => setShowlogin(false)}
                        src={assets.cross_icon}
                        alt="close"
                    />
                </div>

                <div className="login-popup-toggle">
                    <button
                        type="button"
                        className={currentState === "Login" ? "active-tab" : ""}
                        onClick={() => setCurrentState("Login")}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className={currentState === "Sign up" ? "active-tab" : ""}
                        onClick={() => setCurrentState("Sign up")}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="login-popup-inputs">
                    {currentState === "Sign up" && (
                        <input
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder="Your Name"
                            required
                        />
                    )}
                    <input
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        type="email"
                        placeholder="Email ID"
                        required
                    />
                    <input
                        name="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>

                <button type="submit">
                    {currentState === "Sign up" ? "Create Account" : "Login"}
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing I agree to all the <span>terms of use & privacy policy</span>.</p>
                </div>
            </form>
        </div>
    );
};

export default LoginPopup;
