import userContext from "../CONTEXT/userContext"
import { useContext, useEffect, useRef, useState } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import formatDistance from "date-fns/formatDistance"
import {PencilIcon} from '@primer/octicons-react'
import axios from 'axios'
import Validation from "../ELEMENTS/Validation"
import { toast } from 'react-toastify'

export default function EditProfile() {

    //CONTEXT
    const isDark = useContext(ThemeContext)
    const {user,setUser} = useContext(userContext)
    //STATE
    const [username, setUsername] = useState('')
    const [showEdit,setShowEdit] = useState(true)
    const [preview ,setPreview] = useState('') 
    const [image ,setImage] = useState(null) 
    const [errors ,setErrors] = useState([]) 
    //IMAGE INPUT REF
    const imageSet = useRef()
    //error display
    const displayErrors = errors?.map((error, i) => <Validation key={i} valid={false} message={error} />)

    useEffect(()=>{
    //sets preview for whe image is selected befor upload using file reader
        if (image) {
            const reader = new FileReader()
            reader.onload = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(image)
        }
        else {
            setPreview('')
        }
    },[image,user])

    useEffect(()=>{
    //sets and resets errors on effect
        if(showEdit) {setErrors([]); setUsername('')}
        if (username.length > 0 && user.username !== username) userNameValidate()
    },[username, showEdit])
    
    function submitChanges(link='') {
    //user update request, toast completion or error
        fetch(`users/${user.id}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(link ? {username,image_url: link} : {username})})
        .then(resp => {
            if (resp.ok){
                resp.json().then(user => setUser(user)) 
                setShowEdit(true)
                setImage(null)
                setPreview('')
                setUsername('')
                toast('changes accepted!',{type:'success'})
            }
            else toast('something went wrong',{type:'error'})}
        )
    }

    function faceDetectTransorm(link) {
        //uses cloudinary face detection transformation to ensure faces are centered upon submitting image_url
        return [link.split('upload/')[0], "upload/c_thumb,g_faces,h_400,w_400/", link.split('upload/')[1]].join('')
    }

    function handleProfileUpdate() {
        //click to commit changes
        if (image){
        const formData = new FormData()

        formData.append('file', image)
        formData.append("upload_preset", "equlchhq")

        axios.post("https://api.cloudinary.com/v1_1/unifyed-media/image/upload", formData)
        .then(image => submitChanges(faceDetectTransorm(image.data.secure_url)))
        }
        else submitChanges()
    }

    function handleImageSelect({target: {files}}) {
        //image upload onchange
        setImage(files[0])
    }

    function toggleEditUserName() {
        //show or hide edit username
        setShowEdit(prev => !prev)
        setErrors([])
    }

    function handleUserNameChange({target: {name, value}}) {
        //form control for username edit
        setUsername(value)
    }
    
    function displayedImageUrl(){
        //sets image to be displayed from user / preview / or placeholder if none
        if (!preview) return user?.image_url || "https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
        else return preview
    }

    function imgInputClick() {
        //Ref click on image to image input tag
        imageSet.current.click()
    }

    function userNameValidate() {
        //request to backend to check if username is available then runs front end validation
        checkUserNameAvailable()
        if (username.length < 5){
            if (!errors.find(error => error === 'username too short')) setErrors(prev => [...prev,'username too short'])
        }
        else{
            setErrors(prev => prev.filter(error => error !== 'username too short'))
        }
    }

    function checkUserNameAvailable() {
        //back end username availablilty request
        fetch('/username',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({username})})
        .then(r => {!r.ok ? setErrors(prev => [...prev,'username unavailable']) 
        : setErrors(prev => prev.filter(error => error !== 'username unavailable'))})
    }


    if (user) return (
        <div className={"row no-gutters justify-content-center " + (isDark.current === 'true' ? "bg-dark" : "")}>
            <div className={"col-sm-3 d-none d-md-block " + (isDark.current === 'true' ? "bg-dark" : "")}></div>
            <div className={"col-sm-6 justify-content-center align-items-center text-center " + (isDark.current === 'true' ? "bg-dark text-white" : "")}>
                <img onClick={imgInputClick} role="button" src={displayedImageUrl()} className="rounded-circle img-fluid m-5 mx-auto border border-5 d-block" alt="profile picture" style={{width:'23rem', height:'23rem', objectFit:'cover'}} data-bs-toggle="tooltip" data-bs-title="Default tooltip"></img>
                <input ref={imageSet} className='d-none' accept="image/*" type="file" name='image_url' onChange={handleImageSelect}></input>
                <div style={{marginLeft:'1.5rem'}}>
                {showEdit ? <h3 className="p-3 d-inline"><span className="badge bg-secondary">{user?.username}</span></h3> :
                <input value={username} name='username' onChange={handleUserNameChange} className={"form-control w-25 mx-auto d-inline is-" + (errors.length > 0 ?"invalid" : "valid")} autoComplete='off' placeholder={user?.username}></input>}
                <div className="d-inline-block" role="button" onClick={toggleEditUserName} ><PencilIcon className="px-3" verticalAlign="middle" size={24} /></div>
                </div>
                {!showEdit ? displayErrors : null}
                <hr className="w-50 mx-auto mt-4"></hr>
                <h4 className="p-3"><span className="badge bg-secondary">Member since {formatDistance(Date.parse(user?.created_at), new Date(),{ addSuffix: true })}</span></h4>
                <button className="btn btn-primary purple-lm m-2" onClick={handleProfileUpdate}><b>update profile</b></button>
            </div>
            <div className={"col-sm-3 d-none d-md-block " + (isDark.current === 'true' ? "bg-dark" : "")}></div>
        </div>
    )
}