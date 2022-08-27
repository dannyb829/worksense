import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"
import { toast } from 'react-toastify'

export default function NavBar(){

  const isDark = useContext(ThemeContext)
  const {user, setUser} = useContext(userContext)

  const theme = isDark.current === 'true' ? "dark" : "light"
console.log(isDark)
    function handleThemeSwitch() {
      window.localStorage.setItem('darkmode', (window.localStorage.getItem('darkmode') === 'true' ? 'false' : 'true')) 
      isDark.current = isDark.current === 'true' ? 'false' : 'true'
      toast(((isDark.current === 'true' ? 'Dark' : 'Light') + ' mode activated'),{type:'success'})
    }

    function handleLogout() {
      fetch('/logout')
      .then(r => setUser(null))
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
            <ul className={"navbar-nav justify-content-end flex-grow-1 pe-3"}>
              { user ? <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li> : null}
              <li className="nav-item">
                <a className="nav-link active" href='#' aria-current="page" onClick={handleThemeSwitch}>Toggle dark mode</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className={"dropdown-menu dropdown-menu-" + theme} >
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </li>
                </ul>
              </li>
              {user ? <li className="nav-item">
                <a className="nav-link" href='/login' onClick={handleLogout}>Logout</a>
              </li> : null}
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </nav>
    )
}