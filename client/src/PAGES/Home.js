import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"
import ConvoCard from "../ELEMENTS/ConvoCard"
import ConversationForm from "../ELEMENTS/ConversationForm"

export default function Home({ conversations }) {
    const { user } = useContext(userContext)
    const isDark = useContext(ThemeContext)

    
    const displayConvos = user ? conversations?.map((convo) => <ConvoCard key={convo.id} convo={convo} />) : null




    return (
        <div className={"row no-gutters overflow-scroll" + (isDark.current === 'true' ? " bg-dark" : "")}>
            <div className="col-md-2 d-none d-md-block"></div>
            <div className={"col-md-8 px-0 overflow-scroll" + (isDark.current === 'true' ? " bg-dark text-white" : "")} >
                <div className='list-group rounded-0'>
            <ConversationForm/>
                    {displayConvos?.length ? displayConvos : <h1 className='m-4 p-2 emoji'>Get the conversation going, click above <span className='emoji'>🔝🔝🔝🔝🔝🔝</span></h1>}
                </div>
            </div>
            <div className="col-md-2 d-none d-md-block"></div>
        </div>
    )
}
