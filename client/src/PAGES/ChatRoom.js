import { createRef, useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"
import ConvoCard from "../ELEMENTS/ConvoCard"
import NonUserBubble from "../ELEMENTS/NonUserBubble"
import TextBox from "../ELEMENTS/TextBox"
import UserBubble from "../ELEMENTS/UserBubble"
import { SocketContext } from "../index.js"





const ChatRoom = ({ convoState }) => {
    const [messages, setMessages] = useState([])
    const { conversations, conversationLoad } = convoState
    const [channel, setChannel] = useState(null)
    const { id } = useParams()
    const chatSocket = useContext(SocketContext)
    const isDark = useContext(ThemeContext)
    const { user } = useContext(userContext)
    const navigate = useNavigate()
    const scrollPoint = useRef(null)

    useEffect(() => {
        conversationLoad(true, parseInt(id))
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
    
    useEffect(()=>{
        scrollDownMessages()
    },[messages])

    function scrollDownMessages() {
        scrollPoint.current?.scrollIntoView({behavior:'smooth'})
    }

    const displayMessages = messages?.map((message, i) => {
        if (message.user?.id === user?.id) return <UserBubble key={message.id} message={message} isLast={i === messages.length - 1 ? true : false} />
        else return <NonUserBubble key={message.id} message={message} isLast={i === messages.length - 1 ? true : false} />
    })

    const conversationList = conversations?.map((convo) => <ConvoCard key={convo.id} convo={convo} mini={true} current={convo.id == id ? true : false} />)
    return (
        <>
            <div className={"row no-gutters" + (isDark.current === 'true' ? " bg-dark" : "")} >
                <div className='col-sm-3 p-0 d-none d-md-block scrn-height overflow-scroll b-border-right'>
                    <div className="list-group rounded-0">
                        <li className={"list-group-item px-4 rounded-0 border-end-0 text-muted " + (isDark.current === 'true' ? " bg-dark" : "")}><h6 className="px-1">SUBJECTS</h6></li>
                        {conversationList}
                    </div>
                </div>
                <div className='col-sm-9 c-pad scrn-height overflow-scroll'>
                    {displayMessages}
                    <div ref={scrollPoint}></div>
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