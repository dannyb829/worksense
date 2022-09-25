import { useContext } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"



export default function InfoBar({filtered, setFiltered, inNav = false}) {
    //CONTEXT
    const { user } = useContext(userContext)
    const isDark = useContext(ThemeContext)

    const percentage = user?.participation || 0
    
    const encouragement = () => {
        if (percentage === 100) return "excellent"
        else if (percentage > 80) return "great"
        else if (percentage > 60) return "okay"
        return "needs work"
    }

    return (
        <div className={"sticky-top" + (inNav ? "d-block d-md-none mt-5" : "")} style={{zIndex: 1}}>
            <h3 className={"mt-3 text-" + (inNav ? "white" : "purple")}><b className="ms-3">participation:</b></h3>
            <h3 className={"text-" + (inNav ? "white" : "purple")}><b className="ms-3">{encouragement()}</b></h3>
            <div className="progress mx-3 mt-4">
                <div className="progress-bar"
                    role="progressbar"
                    style={{ width: `${percentage}%` }}
                    aria-valuenow={`${percentage}`}
                    aria-valuemin="0"
                    aria-valuemax="100">{percentage}</div>
            </div>
            <h4><span class="badge purple-lm ms-3 mt-4">unread<span class={"badge ms-2 text-bg-" + (!!user?.total_notifications ? "danger" : "secondary")}>{user?.total_notifications || 0}</span></span></h4>
            <div className="mx-3">
            <hr></hr>
            <p className={(isDark.current === 'true' || inNav ? "text-white": "") + (!user?.total_notifications ? " d-none" : "")} role='button' onClick={()=>{setFiltered(!filtered)}}><u>{filtered ? "view all" : "view unread"}</u></p>
            </div>
        </div>
    )
}