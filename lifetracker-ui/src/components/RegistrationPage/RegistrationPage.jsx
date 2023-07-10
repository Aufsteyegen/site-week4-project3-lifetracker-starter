import { useState } from 'react'
import { Link } from "react-router-dom"
import "./RegistrationPage.css"
import axios from "axios"

export default function RegistrationPage() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [registered, setRegistered] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const userData = {
                email: email,
                username: username,
                firstName: firstname,
                lastName: lastname,
                password: password,
            }
            await axios.post('https://greg-lifetracker-codepath.onrender.com/register', userData)
            console.log('User registration successful')
            setRegistered(true)
        } catch (error) {
            setError(error.response.data)
            console.error(error)
        }
    }

    return (
        <div className="registration">
            {(!registered && error === "") && (
            <>
            
            <div>
                <form onSubmit={handleSubmit}>
                <svg viewBox="0 0 128 128" className="register-img" role="img" aria-label=" avatar"><path fill="currentColor" d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"></path><path fill="currentColor" d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"></path></svg>
            <h1>Create an account</h1>
                    <label htmlFor="email">Email<span>*</span></label>
                    <input type="email" name="email" placeholder="codepath@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    
                    <label htmlFor="username">Username<span>*</span></label>
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    
                    <label htmlFor="firstname">First name<span>*</span></label>
                    <input type="text" name="firstname"  value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                    
                    <label htmlFor="lastname">Last name<span>*</span></label>
                    <input type="text" name="lastname"  value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                    
                    <label htmlFor="password">Password<span>*</span></label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    
                    <label htmlFor="confirmpassword">Confirm password<span>*</span></label>
                    <input type="password" name="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                    <div id="register-conditions">
                        <input id="register-chck" type="checkbox" required />
                        I agree to the terms and conditions.
                    </div>

                    <input id="submit-btn" type="submit" onClick={handleSubmit}></input>
                </form>
            </div>
            <div className="below-register">
                <Link to="/login">
                    Have an account? Log in
                </Link>
            </div>
            </>
            )}
            {registered && (
                <div className="registered">
                                <svg viewBox="0 0 128 128" className="register-img" role="img" aria-label=" avatar"><path fill="currentColor" d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"></path><path fill="currentColor" d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"></path></svg>

                    <div>You have been successfully registered.</div>
                    <div><Link to="/login"><button>Log in</button></Link></div>
                </div>
            )}
            {error !== "" && (
                <div className="registered">
                    There was an error signing you up: {error}
                </div>
            )}
        </div>
    )
}