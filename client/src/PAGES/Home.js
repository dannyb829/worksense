import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"
import ConvoCard from "../ELEMENTS/ConvoCard"

export default function Home({ convoState }) {
    const { user } = useContext(userContext)
    const { conversations, conversationLoad } = convoState
    const isDark = useContext(ThemeContext)

    useEffect(() => {
        conversationLoad()
    }, [user])
    
    const displayConvos = user ? conversations?.map((convo) => <ConvoCard key={convo.id} convo={convo} />) : null

console.log(conversations)


    return (
        <div className={"row no-gutters overflow-scroll" + (isDark.current === 'true' ? " bg-dark" : "")}>
            <div className="col-sm-2"></div>
            <div className={"col-sm-8 px-0 overflow-scroll" + (isDark.current === 'true' ? " bg-dark" : "")} style={{ backgroundColor: (isDark ? "#282c34" : "#fff") }}>
                <div className='list-group rounded-0'>
                    {displayConvos}
                </div>
            </div>
            <div className="col-sm-2"></div>
        </div>
    )
}
