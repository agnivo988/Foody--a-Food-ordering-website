import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const LoginPopup = ({setShowlogin}) => {

    const {url,setToken} = useContext(StoreContext)

     const [currentState,setCuurentState] = useState("Login")

     const [data,setData] = useState({
        name:"",
        email:"",
        password:""
     })

     const onChangeHandler = (event) =>{
         const name = event.target.name ;
         const value = event.target.value;
         setData(Data=>({...data,[name]:value}))
     }

     const onLogin = async(event) => {
         event.preventDefault();
         let newUrl = url;
         if (currentState==="Login") {
              newUrl += "/api/user/login"            
         }
         else{
            newUrl += "/api/user/register"
         }

         const response = await axios.post(newUrl,data);

         if (response.data.success) {
                        setToken(response.data.token);
                        localStorage.setItem("token",response.data.token);
                        setShowlogin(false)
         }
         else{
            alert(response.data.message)
         }
     }

     

  return (
    <div className="login-popup">
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowlogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState==="Login"?<></>:<input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email id' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit'>{currentState==="Sign up"?"create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing I agree to all the terms of use & privacy policy.</p>
            </div>
            {currentState==="Login"?<p>Create a new account? <span onClick={
                ()=>setCuurentState("Sign up")
            }>Click here</span></p>
            :<p>Already have an account? <span onClick={
                ()=>setCuurentState("Login")
            }>Login here</span></p>}
        
        </form>
    </div>
  )
}

export default LoginPopup