import userContext from "../CONTEXT/userContext"
import { useContext, useState } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import formatDistance from "date-fns/formatDistance"
import {PencilIcon} from '@primer/octicons-react'


export default function EditProfile() {
    const [profileUpdate, setProfileUpdate] = useState({username:'', image_url:''})
    const isDark = useContext(ThemeContext)
    const {user} = useContext(userContext)
    const [showEdit,setShowEdit] = useState(true)

    const {username, image_url} = profileUpdate

    

    function handlePhotoUpload() {
        alert('clicked!')
    }

    function toggleEditUserName() {
        setShowEdit(prev => !prev)
    }

    function handleUserNameChange({target: {name, value}}) {
        setProfileUpdate(prev => ({...prev, [name]: value }))
    }
    console.log(isDark)

    if (user) return (
        <div className={"row no-gutters justify-content-center " + (isDark.current === 'true' ? "bg-dark" : "")}>
            <div className={"col-sm-3 d-none d-md-block " + (isDark.current === 'true' ? "bg-dark" : "")}></div>
            <div className={"col-sm-6 justify-content-center align-items-center text-center " + (isDark.current === 'true' ? "bg-dark text-white" : "")}>
                <img onClick={handlePhotoUpload} role="button" src={user?.image_url || "https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"} className="rounded-circle img-fluid w-50 m-5 mx-auto border border-5  d-block" alt="profile picture or placeholder"></img>
                {showEdit ? <h3 className="p-3 d-inline"><span className="badge bg-secondary">{user?.username}</span></h3> :
                <input value={username} name='username' onChange={handleUserNameChange} className="form-control w-25 mx-auto d-inline is-invalid" id="inputPassword2" placeholder={user?.username}></input>}
                <div className="d-inline-block" role="button" onClick={toggleEditUserName} ><PencilIcon className="px-3" verticalAlign="middle" size={24} /></div>
                <hr className="w-50 mx-auto"></hr>
                <h4 className="p-3"><span className="badge bg-secondary">Member since {formatDistance(Date.parse(user?.created_at), new Date(),{ addSuffix: true })}</span></h4>
            </div>
            <div className={"col-sm-3 d-none d-md-block " + (isDark.current === 'true' ? "bg-dark" : "")}></div>
        </div>
    )
}