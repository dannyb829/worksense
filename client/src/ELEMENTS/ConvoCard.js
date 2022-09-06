import { useContext, useEffect, useState } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import { formatDistance } from "date-fns"

export default function ConvoCard({ convo, mini, current = false }) {
    const isDark = useContext(ThemeContext)
    const [notifications ,setNotifications] = useState(0) 
    const { id, name, description, last_message } = convo

    const last_updated = last_message ? formatDistance(Date.parse(last_message?.created_at), new Date(), { addSuffix: true }) : new Date
console.log('notifications',notifications)
    useEffect(()=>{
        fetch(`/convo/notifications/${convo.id}`)
        .then(resp => resp.json())
        .then(setNotifications)
    },[convo])

    return (
        <>
        <a href={`/chatroom/${id}`} className={"list-group-item list-group-item-action flex-column align-items-start list-pad " + (isDark.current === 'true' && !current ? "text-white bg-dark dark-convo-hover" : "") + (current ? " current-convo bg-gradient" : "")}>
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