import { useContext } from "react"
import ThemeContext from "../CONTEXT/ThemeContext"
import {formatRelative} from 'date-fns'

export default function NonUserBubble({message}){
	const {isDark} = useContext(ThemeContext)

	const sent = formatRelative(Date.parse(message?.created_at), new Date())

    return (
        <div className="chat-message-left pb-4" >
								<div>
									<img src={message.user?.image_url || "https://bootdey.com/img/Content/avatar/avatar3.png"} className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
								</div>
								<div className="flex-shrink-1 rounded py-2 px-3 ml-3 bb-margin shadowed purple-lm" style={{backgroundColor:'#f54ff5'}}>
									<div className="font-weight-bold mb-1"><b>{message.user?.username}</b></div>
									{message?.content}
									<div className={"text-white small text-nowrap mt-2"}>{sent}</div>
								</div>
							</div>
    )
}