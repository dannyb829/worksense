import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"
import { toast } from 'react-toastify'
import InfoBar from "./InfoBar"

export default function NavBar(){
  //CONTEXT
  const isDark = useContext(ThemeContext)
  const {user, setUser} = useContext(userContext)
  //NAVIGATE
  const navigate = useNavigate()
  //STATE
  const theme = isDark.current === 'true' ? "dark" : "light"

    function handleThemeSwitch() {
      window.localStorage.setItem('darkmode', (window.localStorage.getItem('darkmode') === 'true' ? 'false' : 'true')) 
      isDark.current = isDark.current === 'true' ? 'false' : 'true'
      toast(((isDark.current === 'true' ? 'Dark' : 'Light') + ' mode activated'),{type:'success'})
    }

    function handleLogout() {
      fetch('/logout')
      setUser(null)
      navigate('/login')
    }

    return (
        <nav className={"navbar navbar-" + (isDark.current === 'true' ? "dark bg-dark" : " purple-lm")} >
      <div className={"container-fluid"}>
        <a className="navbar-brand" href="#"><b style={{color:(isDark.current === 'true' ? '#8723eb' : "#fff")}}>WorkSense</b></a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className={"offcanvas-header show text-white" + (isDark.current === 'true' ? " bg-dark": " purple-lm")} >
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><b style={{color:(isDark.current === 'true' ? '#8723eb' : "#fff")}}>WorkSense</b></h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className={"offcanvas-body show text-white" + (isDark.current === 'true' ? " bg-dark" : " purple-lm") } >
            <ul className={"navbar-nav justify-content-end flex-grow-1 pe-3 m-3"}>
              { user ? <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li> : null}
              <li className="nav-item">
                <a className="nav-link active" href='#' aria-current="page" onClick={handleThemeSwitch}>Toggle dark mode</a>
              </li>
              {user ? <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul className={"dropdown-menu dropdown-menu-" + theme} > 
                  <li><a className="dropdown-item" href='/profile' aria-current="page">Edit Profile</a></li>
                  <li><a className="dropdown-item" href='#' data-bs-dismiss="offcanvas" onClick={handleLogout}>Logout</a></li> 
                </ul>
              </li> : null}
            </ul>

            <InfoBar inNav={true} />


          </div>
        </div>
      </div>
    </nav>
    )
}