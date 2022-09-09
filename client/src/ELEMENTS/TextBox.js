import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userContext from "../CONTEXT/userContext"




export default function TextBox({chatSocket}){
    const [content ,setContent] = useState('') 
    const {user} = useContext(userContext)
    const { id } = useParams()

    function submitMessage(e) {
        if (content) {
        const message = {content, user_id: user.id, convo_id: id, action:"recieve_message"}
                    
        chatSocket.send(message)
        setContent('')
        }
    }

    return (
    <div className="flex-grow-0 py-3 px-4" >
        <div className="input-group mb-1" >
            <input type="text" className="form-control " placeholder="Type your message" value={content} onChange={e =>setContent(e.target.value)} />
            <button className="btn btn-primary" onClick={submitMessage}>Send</button>
        </div>
    </div>
    )
}