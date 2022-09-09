import { useContext, useEffect } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import { useState } from "react"
import { toast } from 'react-toastify';
import Validation from "./Validation";
import userContext from "../CONTEXT/userContext";



export default function RegisterForm({setIsNewUser}) {
  //CONTEXT
  const isDark = useContext(ThemeContext)
  const {user} = useContext(userContext)
  //STATE
  const [newUser ,setNewUser] = useState({username:"",password:"",password_confirmation:""}) 
  const { username, password, password_confirmation } = newUser
  const [errors, setErrors] = useState({username:[],password:[],confirmation:[]})
  //ERROR DISPLAY
  const usernameErrors = errors.username.map((error, i) => <Validation key={i} valid={false} message={error} register={true} />)
  const passwordErrors = errors.password.map((error, i) => <Validation key={i} valid={false} message={error} register={true} />)
  const confirmationErrors = errors.confirmation.map((error, i) => <Validation key={i} valid={false} message={error} register={true} />)

  useEffect(()=>{
    //sets and resets username errors on effect, .5 second delay
    const timeOut = setTimeout(()=>{userNameValidate()},500) 
    return ()=>{clearTimeout(timeOut)}
  },[username])
  
  useEffect(()=>{
    //sets and resets password errors on effect, .5 second delay
    const timeOut = setTimeout(()=>{passwordValidation()},500) 
    return ()=>{clearTimeout(timeOut)}
  },[password])
  
  useEffect(()=>{
    //sets and resets password_confirmation errors on effect, .5 second delay
    const timeOut = setTimeout(()=>{confirmationValidation()},500) 
    return ()=>{clearTimeout(timeOut)}
  },[password_confirmation])


    function userNameValidate() {
      //request to backend to check if username is available then runs front end validation
      checkUserNameAvailable()
      if (username === '') setErrors(prev => ({...prev, username: []}))
      else if (username.length < 5) {
        if (!errors.username.find(error => error === 'username too short')) setErrors(prev => ({...prev,username:[...prev.username, 'username too short']}))
      }
      else {
        setErrors(prev => ({...prev,username: prev.username.filter(error => error !== 'username too short')}))
      }
    }
  
    function checkUserNameAvailable() {
      //back end username availablilty request
      fetch('/username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      })
        .then(r => {
          !r.ok ? setErrors(prev => ({...prev, username:[...prev.username, 'username unavailable']}))
          : setErrors(prev => ({...prev, username: prev.username.filter(error => error !== 'username unavailable')}))
        })
    }

    function passwordValidation() {
      if (password === '') setErrors(prev => ({...prev, password: []}))
      else if (password.length < 6) setErrors(prev => ({...prev, password: ['password too short']}))
      else setErrors(prev => ({...prev, password: []}))
    }

    function confirmationValidation() {
      if (password_confirmation === '') setErrors(prev => ({...prev, confirmation: []}))
      else if (password !== password_confirmation) setErrors(prev => ({...prev,confirmation: ['password does not match confirmation']}))
      else setErrors(prev => ({...prev, confirmation: []}))
    }

    function isValidForm() {
      if (username && password && password_confirmation) {
        if (errors.username.length || errors.password.length || errors.confirmation.length) return false
        return true
      }
      return false
    }

  function handleSignUpSubmit() {
    if (isValidForm()) {
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
  else toast('please complete form',{type:'error'})
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
        <div className={"card shadow-2-strong " + (isDark.current === 'true' ? "text-white bg-dark" : "")} style={{border:0}}>
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Sign up</h3>

            <div className="form-outline mb-4">
              <input type="email" id="typeEmailX-2" className={"form-control form-control-lg " + (errors.username.length ? "is-invalid" : (!username ? "" : "is-valid"))} name='username' value={username} onChange={handleSignUpForm}/>
              <label className="form-label" htmlFor="typeEmailX-2">Username</label>
            </div>
            {usernameErrors}
            <div className="form-outline mb-4">
              <input type="password" id="typePasswordX-2" className={"form-control form-control-lg " + (errors.password.length ? "is-invalid" : (!password ? "" : "is-valid"))} name='password' value={password} onChange={handleSignUpForm}/>
              <label className="form-label" htmlFor="typePasswordX-2">Password</label>
            </div>
            {passwordErrors}
            <div className="form-outline mb-4">
              <input type="password" id="typePasswordX-3" className={"form-control form-control-lg " + (errors.confirmation.length ? "is-invalid" : (!password_confirmation ? "" : "is-valid"))} name='password_confirmation' value={password_confirmation} onChange={handleSignUpForm}/>
              <label className="form-label" htmlFor="typePasswordX-2">Confirm Password</label>
            </div>
            {<>{confirmationErrors}<br></br></> }
            
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