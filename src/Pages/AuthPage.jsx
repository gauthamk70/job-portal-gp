import React, { useState } from "react";
import "./auth.css";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../Redux/slice/userSlice";

function AuthPage() {

  const dispatch = useDispatch()

  const [isRegister, setIsRegister] = useState(false)

  const [loginData,setLoginData] = useState({
    email:"",
    password:""
  })

  const [registerData,setRegisterData] = useState({
    name:"",
    email:"",
    password:""
  })

  const handleRegister = () => {
    //  console.log("Register clicked", registerData)
    dispatch(registerUser({
      ...registerData,
      profile:{
        gender:"",
        location:"",
        education:[],
        workExperience:[]
      }
    }))
  }

  const handleLogin = () => {
    dispatch(loginUser(loginData))
  }

  return (
    <div className={`container ${isRegister ? "active" : ""}`}>

      <div className="form-container">

        {!isRegister ? (
          <div className="form login">
            <h2>Login</h2>

            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e)=>setLoginData({...loginData,email:e.target.value})}
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e)=>setLoginData({...loginData,password:e.target.value})}
            />

            <button onClick={handleLogin}>Login</button>
          </div>

        ) : (

          <div className="form register">
            <h2>Register</h2>

            <input
              type="text"
              placeholder="Name"
              value={registerData.name}
              onChange={(e)=>setRegisterData({...registerData,name:e.target.value})}
            />

            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e)=>setRegisterData({...registerData,email:e.target.value})}
            />

            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e)=>setRegisterData({...registerData,password:e.target.value})}
            />

            <button onClick={handleRegister}>Register</button>
          </div>
        )}

      </div>

      <div className="panel">
        {!isRegister ? (
          <>
            <h2>New Here?</h2>
            <button onClick={() => setIsRegister(true)}>Register</button>
          </>
        ) : (
          <>
            <h2>Already have account?</h2>
            <button onClick={() => setIsRegister(false)}>Login</button>
          </>
        )}
      </div>

    </div>
  )
}

export default AuthPage