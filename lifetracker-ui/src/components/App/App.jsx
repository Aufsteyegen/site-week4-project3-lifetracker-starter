import './App.css'
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import RegistrationPage from '../RegistrationPage/RegistrationPage'
import LoginPage from "../LoginPage/LoginPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [authState, setAuthState] = useState("")
    const [activities, setActivities] = useState([{}])
    
  

    const [exerciseMinutes, setExerciseMinutes] = useState(0)
    const [sleepHours, setSleepHours] = useState(0)
    const [calories, setCalories] = useState(0)

    useEffect(() => {
        if (!loggedIn) {
            setSleepHours(0)
            setCalories(0)
            setExerciseMinutes(0)
        }
    }, [loggedIn])

    useEffect(() => {
        const token = localStorage.getItem('token')
        const curCals = localStorage.getItem('calories')
        if (token !== null && token !== undefined) setLoggedIn(true)
        if (curCals !== null && curCals !== undefined) setCalories(curCals)
    }, [])

  return (
    <div className="app">
        <BrowserRouter>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <Routes>
                {!loggedIn && (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<RegistrationPage />} />
                        <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn}
                                               authState={authState} setAuthState={setAuthState}
                                               activities={activities} setActivities={setActivities} />} />
                    </>
                )}
                {loggedIn && (
                    <>
                        <Route path="/activity" element={<ActivityPage calories={calories} setCalories={setCalories}
                                                        setActivities={setActivities}
                                                          sleepHours={sleepHours} exerciseMinutes={exerciseMinutes}
                                                          activities={activities} />} />
                        <Route
  path="/nutrition"
  element={
    <NutritionPage
      calories={calories}
      setCalories={setCalories}
      activities={activities}
      setActivities={setActivities}
    />
  }
/>
                    </>
                )}
                
             </Routes>
        </BrowserRouter>

    </div>
  )
}

export default App
