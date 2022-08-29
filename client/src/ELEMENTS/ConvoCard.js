import { useContext } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import { formatDistance } from "date-fns"

export default function ConvoCard({ convo, mini }) {
    const isDark = useContext(ThemeContext)

    const { id, name, description, last_message } = convo

    const last_updated = formatDistance(Date.parse(last_message?.created_at), new Date(), { addSuffix: true })

    return (
        <>
        <a href={`/chatroom/${id}`} className={"list-group-item list-group-item-action flex-column align-items-start list-pad "+ (mini ? "border-end-0 ": "") + (isDark.current === 'true' ? "text-white bg-dark" : "")}>
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