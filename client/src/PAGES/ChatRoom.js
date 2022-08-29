import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"
import ConvoCard from "../ELEMENTS/ConvoCard"
import NonUserBubble from "../ELEMENTS/NonUserBubble"
import TextBox from "../ELEMENTS/TextBox"
import UserBubble from "../ELEMENTS/UserBubble"
import { SocketContext } from "../index.js"





const ChatRoom = ({convoState}) => {
    const [messages, setMessages] = useState([])
    const { conversations, conversationLoad } = convoState
    const [channel, setChannel] = useState(null)
    const { id } = useParams()
    const chatSocket = useContext(SocketContext)
    const isDark = useContext(ThemeContext)
    const { user } = useContext(userContext)
    const navigate = useNavigate()

    useEffect(() => {
        conversationLoad()
        const channel = chatSocket.subscriptions.create({
            channel: 'ConversationChannel',
            data: id
        },
            {
                connected(e) { channel.send({ action: 'convo_load' }) },
                disconnected() { console.log('disconnected') },
                received(e) { if (!e?.message) setMessages(e) }
            }

        )
        setChannel(channel)
        return () => {
            channel.unsubscribe()
        }
    }, [id, chatSocket.subscriptions])



    const displayMessages = messages?.map((message) => {
        if (message.user?.id === user?.id) return <UserBubble key={message.id} message={message} />
        else return <NonUserBubble key={message.id} message={message} />
    })

    const conversationList = conversations?.map((convo) => <ConvoCard key={convo.id} convo={convo} mini={true}/>)
    if (user) return (
        <>
            <div className={"row no-gutters" + (isDark.current === 'true' ? " bg-dark" : "")} >
                <div className='col-sm-3 p-0 d-none d-md-block scrn-height overflow-scroll b-border-right'>
                    <div className="list-group rounded-0">
                    <li className={"list-group-item px-4 rounded-0 border-end-0 text-muted " + (isDark.current === 'true' ? " bg-dark" : "")}><h6 className="px-1">SUBJECTS</h6></li>
                        {conversationList}
                    </div>
                </div>
                <div className='col-sm-9 c-pad scrn-height overflow-scroll' id='chat-display'>
                    {displayMessages}
                </div>
                <div className='col-sm-3' ></div>
                <div className={'col-sm-9 chat-input ' + (isDark.current === 'true' ? "bg-dark" : "bg-light")} >
                    <TextBox chatSocket={channel} />
                </div>
            </div>
        </>
    )
}

export default ChatRoom