import { useContext } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"
import ConvoCard from "../ELEMENTS/ConvoCard"
import ConversationForm from "../ELEMENTS/ConversationForm"
import ConvoCardSkeletons from "../ELEMENTS/ConvoCardSkeletons"
import InfoBar from "../ELEMENTS/InfoBar"
import WelcomeHome from "../ELEMENTS/WelcomeHome"
import { FilterContext } from "../CONTEXT/FilterContext"

export default function Home({ conversations }) {
    //CONTEXT
    const { user } = useContext(userContext)
    const isDark = useContext(ThemeContext)
    const { filtered } = useContext(FilterContext)

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
                <InfoBar/>
            </div>
        </div>
    )
}
