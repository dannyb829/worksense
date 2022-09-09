import { useState, useContext, useEffect } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"
import { toast } from 'react-toastify'
import Validation from "./Validation"

export default function LoginForm({ setIsNewUser }) {
  //CONTEXT
  const { user, setUser } = useContext(userContext)
  const isDark = useContext(ThemeContext)
  //STATE
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const { username, password } = credentials
  

  function handleLogin() {
    fetch('/signin', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    })
      //VALID LOGIN ? IF NOT TOAST ERROR
      .then(resp => resp.ok ? resp.json().then(data => setUser(data)) :
        resp.json().then(data => toast(data.error, { type: 'error' }))
      )
  }

  function handleCredentials({ target: { name, value } }) {
    //FORM CONTROL
    setCredentials(prev => ({ ...prev, [name]: value }))
  }


  return (
    <div className="container py-5 h-100" >
      <div className="row d-flex justify-content-center align-items-center h-100 overflow-scroll">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className={"card " + (isDark.current === 'true' ? "text-white bg-dark" : "")} style={{ border: 0 }}>
            <div className="card-body p-5 text-center">
              <h3 className="mb-5">Log in</h3>
              <div className="form-outline mb-4">
                <input type="email" id="typeEmailX-2" className="form-control form-control-lg" value={username} name='username' onChange={handleCredentials} />
                <label className="form-label" htmlFor="typeEmailX-2">Username</label>
              </div>
              <div className="form-outline mb-4">
                <input type="password" id="typePasswordX-2" className="form-control form-control-lg" value={password} name='password' onChange={handleCredentials} />
                <label className="form-label" htmlFor="typePasswordX-2">Password</label>
              </div>
              <button className="btn btn-primary btn-lg btn-block" onClick={handleLogin}>Login</button>
              <hr className="m-3" />
              <div>
                <p className="mb-0">Don't have an account? <a href="#!" onClick={e => setIsNewUser(prev => !prev)} className="text-blue-50 fw-bold">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}