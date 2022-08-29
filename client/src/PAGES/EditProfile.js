import userContext from "../CONTEXT/userContext"
import { useContext } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"


export default function EditProfile() {
    const isDark = useContext(ThemeContext)


    return (
        <div className="row no-gutters">
            <div className={"col-sm-3 " + (isDark.current ? "bg-dark" : "")}></div>
            <div className={"col-sm-6 " + (isDark.current ? "bg-dark" : "")}>
                <h1 className="text-muted">edit profile</h1>
            </div>
            <div className={"col-sm-3 " + (isDark.current ? "bg-dark" : "")}></div>
        </div>
    )
}