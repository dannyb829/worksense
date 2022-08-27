import { useContext } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import { useState } from "react"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export default function RegisterForm({setIsNewUser}) {
  const [newUser ,setNewUser] = useState({username:"",password:"",password_confirmation:""}) 
  const {isDark, setIsDark} = useContext(ThemeContext)



  const { username, password, password_confirmation } = newUser

  function handleSignUpSubmit() {
    fetch('/signup',{
      method:'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newUser)})
    .then(resp => resp.ok ? signUpSuccess() : resp.json().then(data =>{
      data.error.forEach(error => {
        toast(error,{type: 'error'})
      });
    }))
    
  }
  
  function signUpSuccess() {
    toast('Account created, please log in', {type: 'success'})
    setTimeout(()=>setIsNewUser(false),2000)
  }

  function handleSignUpForm({target: {name, value}}) {
    setNewUser(prev => ({...prev, [name]: value}))
  }


    return (
        <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100 overflow-scroll">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className={"card shadow-2-strong " + (isDark ? "text-white bg-dark" : "")} style={{border:0}}>
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Sign up</h3>

            <div className="form-outline mb-4">
              <input type="email" id="typeEmailX-2" className="form-control form-control-lg" name='username' value={username} onChange={handleSignUpForm}/>
              <label className="form-label" htmlFor="typeEmailX-2">Username</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg" name='password' value={password} onChange={handleSignUpForm}/>
              <label className="form-label" htmlFor="typePasswordX-2">Password</label>
            </div>
            <div className="form-outline mb-4">
              <input type="password" id="typePasswordX-3" className="form-control form-control-lg" name='password_confirmation' value={password_confirmation} onChange={handleSignUpForm}/>
              <label className="form-label" htmlFor="typePasswordX-2">Confirm Password</label>
            </div>
            <button className="btn btn-primary btn-lg btn-block" onClick={handleSignUpSubmit}>Register</button>


            <hr className="m-3"/>

            <div>
              <p className="mb-0">Have an account? <a href="#!" onClick={e => setIsNewUser(prev => !prev)} className="text-blue-50 fw-bold">Log in</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
    )
}