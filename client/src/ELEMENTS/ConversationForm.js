import { useContext, useState } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import { toast } from 'react-toastify'




export default function ConversationForm() {
    const [newConversation ,setNewConversation] = useState({name:'',description:''}) 
    const {name, description} = newConversation
    const isDark = useContext(ThemeContext)

    function handleFormChange({target:{name, value}}) {
        setNewConversation(prev => ({...prev,[name]: value}))
    }

    function submitNewConversation() {
        fetch('/conversations',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(newConversation)})
            .then(resp => resp.ok ? toast('Conversaion started!',{type:'success'}) : 
            toast('Something went wrong..',{type:'error'})
            )
    }


    return (
        <>
            <div class={"accordion rounded-0"} id="accordionExample">
                <div className={"accordion-item rounded-0 border border-0 " + (isDark.current === 'true' ? 'bg-dark text-white' : '')}>
                    <h1 className="accordion-header text-white" id="headingTwo">
                        <button className={"accordion-button border border-0 collapsed " + (isDark.current === 'true' ? "bg-dark text-white" : "")} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <b>MESSAGE BOARD</b>
                        </button>
                    </h1>
                    <div id="collapseTwo" className={"accordion-collapse collapse " + (isDark.current === 'true' ? "bg-dark" : "")} aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className={"accordion-body clearfix " + (isDark.current === 'true' ? "bg-dark" : "")}>
                            <div className="form-floating p-3">
                                <input type="text" 
                                className="form-control" 
                                id='conversation-form' 
                                placeholder="title" 
                                name='name' 
                                value={name} 
                                onChange={handleFormChange}
                                aria-label="Example text with button addon" 
                                aria-describedby="button-addon1"></input>
                                <label htmlFor='conversation-form' className="text-black p-4">start a conversation, give it a title!</label>
                            </div>
                            <div className="form-floating p-3">
                                <textarea className="form-control" 
                                placeholder="Leave a comment here" 
                                id="floatingTextarea2" 
                                name='description' 
                                value={description} 
                                onChange={handleFormChange}
                                style={{height: "100px"}}></textarea>
                                <label htmlFor="floatingTextarea2" className="text-black p-4">provide a short description</label>
                            </div>
                                <button className="btn cust-button float-end mx-3" type="button" id="button-addon1" onClick={submitNewConversation} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}