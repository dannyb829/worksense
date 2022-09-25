import { useContext, useState } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"
import ConvoCard from "../ELEMENTS/ConvoCard"
import ConversationForm from "../ELEMENTS/ConversationForm"
import ConvoCardSkeletons from "../ELEMENTS/ConvoCardSkeletons"
import InfoBar from "../ELEMENTS/InfoBar"
import WelcomeHome from "../ELEMENTS/WelcomeHome"

export default function Home({ conversations }) {
    //CONTEXT
    const { user } = useContext(userContext)
    const isDark = useContext(ThemeContext)
    //STATE
    const [filtered, setFiltered] = useState(false)

    const displayConvos = user ? conversations?.map(convo => <ConvoCard key={convo.id} convo={convo} filtered={filtered} />) : null


    return (
        <div className={"row no-gutters overflow-scroll" + (isDark.current === 'true' ? " bg-dark" : "")}>
            <div className="col-md-2 d-none d-md-block">
                <WelcomeHome user={user} />
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
