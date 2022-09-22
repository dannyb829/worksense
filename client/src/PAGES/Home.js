import { useContext, useEffect, useState } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"
import ConvoCard from "../ELEMENTS/ConvoCard"
import ConversationForm from "../ELEMENTS/ConversationForm"
import ConvoCardSkeleton from "../ELEMENTS/ConvoCardSkeleton"

export default function Home({ conversations }) {
    const { user } = useContext(userContext)
    const isDark = useContext(ThemeContext)

    const [contentPending, setContentPending] = useState([...Array(5)].map(card => <ConvoCardSkeleton/>))
    
    
    const displayConvos = user ? conversations?.map((convo) => <ConvoCard key={convo.id} convo={convo} />) : null

    useEffect(()=>{
        const timer = setTimeout(() => {
            setContentPending(<h1 className='m-4 p-2 emoji'>Hmm nothing yet. Get the conversation going, click above <span className='emoji'>🔝🔝🔝🔝🔝🔝</span></h1>)
        }, 10000);

        return () => { clearTimeout(timer)}
    },[])

    


    return (
        <div className={"row no-gutters overflow-scroll" + (isDark.current === 'true' ? " bg-dark" : "")}>
            <div className="col-md-2 d-none d-md-block"></div>
            <div className={"col-md-8 px-0 overflow-scroll" + (isDark.current === 'true' ? " bg-dark text-white" : "")} >
                <div className='list-group rounded-0'>
            <ConversationForm/>
                    {displayConvos?.length ? displayConvos : contentPending}
                </div>
            </div>
            <div className="col-md-2 d-none d-md-block"></div>
        </div>
    )
}
