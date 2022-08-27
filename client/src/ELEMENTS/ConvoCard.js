import { useContext } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"

export default function ConvoCard({ convo, mini }) {
    const isDark = useContext(ThemeContext)

    const { id, name, description, last_message } = convo

    return (
        <>
        <a href={`/chatroom/${id}`} className={"list-group-item list-group-item-action flex-column align-items-start list-pad "+ (mini ? "border-end-0 ": "") + (isDark.current === 'true' ? "text-white bg-dark" : "")}>
            <div className="d-flex w-100 justify-content-between" >
                <p className={"mb-1 " + (mini ? "h5" : "h1")} style={mini ? {} : {height:'7rem'}}>{name}</p>
                <small className="text-muted">3 days ago</small>
            </div>
            {mini ? null : <p className="mb-1">{description}</p>}
            <small className="text-muted"><b style={{ color: '#8723eb' }}>RECENT - </b>{last_message?.content}</small>
        </a>
        </>
    )

}