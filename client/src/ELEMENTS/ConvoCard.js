import { useContext } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import { formatDistance } from "date-fns"

export default function ConvoCard({ convo, mini, current = false }) {
    const isDark = useContext(ThemeContext)

    const { id, name, description, last_message, notification_count } = convo

    const last_updated = last_message ? formatDistance(Date.parse(last_message?.created_at), new Date(), { addSuffix: true }) : new Date

    return (
        <>
        <a href={`/chatroom/${id}`} className={"list-group-item list-group-item-action flex-column align-items-start list-pad " + (isDark.current === 'true' && !current ? "text-white bg-dark" : "") + (current ? " bg-info bg-gradient" : "")}>
        {notification_count && !mini ? <span className="position-absolute top-0 end-0 badge bg-primary m-3">{notification_count} new message{notification_count > 1 ? 's' : ''}</span> : null}
        {notification_count && mini ? <span className="position-absolute top-0 end-0 badge bg-primary m-3">{notification_count}</span> : null}
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