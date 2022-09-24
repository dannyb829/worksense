import { useContext, useState } from "react"
import userContext from "../CONTEXT/userContext"
import Validation from "./Validation"



export default function InfoBar({filtered, setFiltered}) {
    //CONTEXT
    const { user } = useContext(userContext)

    const percentage = user?.participation || 0

    return (
        <>
            <h3 className="mt-3 text-purple"><b className="ms-3">participation</b></h3>
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
            <p role='button' onClick={()=>{setFiltered(!filtered)}}><u>{filtered ? "view all" : "view unread"}</u></p>
            </div>
        </>
    )
}