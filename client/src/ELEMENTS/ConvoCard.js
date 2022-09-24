import { useContext, useEffect, useState } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import { formatDistance } from "date-fns"

export default function ConvoCard({ convo, mini, filtered, current = false }) {
    //theme
    const isDark = useContext(ThemeContext)
    //notifications
    const [notifications ,setNotifications] = useState(0) 
    //convo
    const { id, name, description, last_message } = convo
    const last_updated = formatDistance(Date.parse(last_message ? last_message?.created_at : convo?.created_at), new Date(), { addSuffix: true })

    useEffect(()=>{
        fetch(`/convo/notifications/${convo.id}`)
        .then(resp => resp.json())
        .then(setNotifications)
    },[convo])

    return (
        <>
        <a href={`/chatroom/${id}`} className={"list-group-item list-group-item-action flex-column align-items-start list-pad " + (isDark.current === 'true' && !current ? "text-white bg-dark dark-convo-hover" : "") + (current ? " current-convo bg-gradient" : "") + (filtered && notifications && !mini ? " d-none" : "")}>
        {notifications && !mini ? <span className="position-absolute top-0 end-0 badge bg-primary m-3">{notifications} new message{notifications > 1 ? 's' : ''}</span> : null}
        {notifications && mini ? <span className="position-absolute top-0 end-0 badge bg-primary m-3">{notifications}</span> : null}
            <div className="d-flex w-100 justify-content-between" >
                <p className={"mb-1 " + (mini ? "h5" : "h1")} style={mini ? {} : {height:'7rem'}}>{name}</p>
            </div>
            {mini ? null : <p className="mb-1">{description}</p>}
            <small className="text-muted"><b style={{ color: '#8723eb' }}>RECENT - </b>{last_message?.content.slice(0,(mini ? 15 : 100))}...</small>
                <small className="text-muted position-absolute bottom-0 end-0 m-3">{last_updated}</small>
        </a>
        </>
    )

}