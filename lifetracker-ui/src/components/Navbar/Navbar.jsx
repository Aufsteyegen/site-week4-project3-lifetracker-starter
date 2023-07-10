import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import "./Navbar.css"

export default function Navbar({ loggedIn, setLoggedIn }) {
    const navigate = useNavigate()
    function handleSignOut() {
        localStorage.removeItem('token')
        setLoggedIn(false)
        navigate('/')
    }
  return (
    <div className="Navbar">
      <Link to={loggedIn ? "/activity" : "/"}>
        <img src="https://lifetracker.up.railway.app/assets/codepath-f1b3e41a.svg" alt="Logo" />
      </Link>
      <Link to="/activity">
            <button>ACTIVITY</button>
      </Link>
      <Link to="/exercise">
        <button>EXERCISE</button>
      </Link>
      <Link to="/nutrition">
        <button>NUTRITION</button>
      </Link>
      <Link to="/sleep">
        <button>SLEEP</button>
      </Link>
      <Link to={loggedIn ? "" : "/login"}>
        <button onClick={handleSignOut} className="login">{loggedIn ? "SIGN OUT" : "LOG IN"}</button>
      </Link>
      {!loggedIn && (
        <Link to="/register">
          <button className="register">REGISTER</button>
        </Link>
      )}
    </div>
  )
}
