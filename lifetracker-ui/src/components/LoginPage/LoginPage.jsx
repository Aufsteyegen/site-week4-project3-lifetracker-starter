import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./LoginPage.css"

export default function LoginPage({ setLoggedIn, setAuthState, authState,
                                    activities, setActivities }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const [loginError, setLoginError] = useState("")
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('activities'));
        setActivities(items);
      }, [setActivities]);
    
    async function handleLogin(event) {
        event.preventDefault()
        try {
          const userData = {
            email: email,
            password: password
          }
          const response = await axios.post('http://localhost:3000/login', userData)
          const { token } = response.data
          setLoginError("")
          console.log(token)
          localStorage.setItem('token', token)
          localStorage.setItem('email', email)
          setLoggedIn(true)
          navigate('/activity')
        } catch (error) {
          console.error('Error:', error.response.data.error)
          const errorMessage = error.response.data.error
          setLoginError(errorMessage)
        }
      }      
    return (
        <div className="registration">
            
            <div>
                
                <form onSubmit={handleLogin}>
                <svg viewBox="0 0 128 128" className="register-img" role="img" aria-label=" avatar"><path fill="currentColor" d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"></path><path fill="currentColor" d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"></path></svg>
            <h1>Welcome back!</h1>
                <label htmlFor="email">Email<span>*</span></label>
                <input type="email" name="email" placeholder="codepath@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="password">Password<span>*</span></label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <input id="submit-btn" type="submit" onSubmit={handleLogin}></input>
                {loginError !== "" && (<div className="login-error">
                    There was an error logging you in: <b>{loginError}</b>
                </div>)}
                </form>
                
                <div className="below-register">
                     <Link to="/register">
                         Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}