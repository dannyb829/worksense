import { useContext } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import {formatRelative} from 'date-fns'

export default function UserBubble({message}){
	const {isDark} = useContext(ThemeContext)

	const sent = formatRelative(Date.parse(message?.created_at), new Date())

    return (
        <div className="chat-message-right pb-4">
								<div>
									<img src={message.user?.image_url || "https://bootdey.com/img/Content/avatar/avatar1.png"} className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"/>
								</div>
								<div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3 bb-margin shadowed">
									<div className="font-weight-bold mb-1"><b>{`you (${message.user?.username})`}</b></div>
									{message?.content}
									<div className={"text-muted small text-nowrap mt-2"}>{sent}</div>
								</div>
							</div>
    )
}