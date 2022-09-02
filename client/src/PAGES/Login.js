import { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"
import LoginForm from "../ELEMENTS/LoginForm"
import RegisterForm from "../ELEMENTS/RegisterForm"

export default function Login(){
    const [isNewUser ,setIsNewUser] = useState(false) 
    const {user} = useContext(userContext)
    const isDark = useContext(ThemeContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if (user) navigate('/')
    },[user])


    if (!user) return (
        <div className={'row ' + (isDark.current === 'true' ? "bg-dark":"")} >
            {isNewUser ? <RegisterForm setIsNewUser={setIsNewUser}/> : <LoginForm setIsNewUser={setIsNewUser}/>}
        </div>
    )
}