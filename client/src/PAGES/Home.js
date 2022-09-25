import { useContext, useEffect, useState } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"
import ConvoCard from "../ELEMENTS/ConvoCard"
import ConversationForm from "../ELEMENTS/ConversationForm"
import ConvoCardSkeletons from "../ELEMENTS/ConvoCardSkeletons"
import InfoBar from "../ELEMENTS/InfoBar"

export default function Home({ conversations }) {
    //CONTEXT
    const { user } = useContext(userContext)
    const isDark = useContext(ThemeContext)
    //STATE
    const [filtered, setFiltered] = useState(false)

    const displayConvos = user ? conversations?.map(convo => <ConvoCard key={convo.id} convo={convo} filtered={filtered} />) : null

    const profilePic = user?.image_url || "https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"

    return (
        <div className={"row no-gutters overflow-scroll" + (isDark.current === 'true' ? " bg-dark" : "")}>
            <div className="col-md-2 d-none d-md-block">
                <div className="m-3">
                    <h3 className="text-purple mb-4"><b>Welcome, {user?.username}!</b></h3>
                    <hr></hr>
                    <img src={profilePic} className="rounded-circle img-fluid mx-auto border border-5 d-block profile-picture w-100 h-50 mt-4" alt="profile picture" style={{pointerEvents: 'none'}}></img>
                </div>
            </div>
            <div className={"col-md-8 px-0 overflow-scroll" + (isDark.current === 'true' ? " bg-dark text-white" : "")} >
                <div className='list-group rounded-0'>
                    <ConversationForm />
                    {displayConvos?.length ? displayConvos : <ConvoCardSkeletons />}
                </div>
            </div>
            <div className="col-md-2 d-none d-md-block">
                <InfoBar filtered={filtered} setFiltered={setFiltered} />
            </div>
        </div>
    )
}
