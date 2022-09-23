import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import ThemeContext from "../CONTEXT/ThemeContext"
import userContext from "../CONTEXT/userContext"
import ConvoCard from "../ELEMENTS/ConvoCard"
import ConvoCardSkeletons from "../ELEMENTS/ConvoCardSkeletons"
import NonUserBubble from "../ELEMENTS/NonUserBubble"
import TextBox from "../ELEMENTS/TextBox"
import UserBubble from "../ELEMENTS/UserBubble"
import { SocketContext } from "../index.js"





const ChatRoom = ({ conversations }) => {
    //STATE
    const [messages, setMessages] = useState([])
    const [channel, setChannel] = useState(null)
    //CONTEXT
    const chatSocket = useContext(SocketContext)
    const isDark = useContext(ThemeContext)
    const { user } = useContext(userContext)
    //REF
    const scrollPoint = useRef(null)
    //PARAMS
    const { id } = useParams()

    useEffect(() => {
        // removes notifications on open chat
        removeNotifications(parseInt(id))
        // create subscription on already instantiated websocket (index.js)
        const channel = chatSocket.subscriptions.create({
            channel: 'MessagesChannel',
            data: id
        },
            {
                // loads messages in conversation upon subscription
                connected(e) { channel.send({ action: 'messages_load' }) },
                disconnected() { console.log('disconnected') },
                // reloads messages
                received(e) { if (!e?.message) setMessages(e); removeNotifications(parseInt(id)) }
            }

        )
        setChannel(channel)
        //cleanup to ensure no redundant subscriptions
        return () => {
            channel.unsubscribe()
        }
    }, [id, chatSocket.subscriptions])

    useEffect(() => {
        //scrolls to last message on chat load
        scrollPoint.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    function removeNotifications(convoId) {
        // deletes all notifications based on specific user and specific chat
        fetch(`/notifications/${convoId}`)
    }


    const displayMessages = messages?.map((message, i) => {
        if (message.user?.id === user?.id) return <UserBubble key={message.id} message={message} isLast={i === messages.length - 1 ? true : false} />
        else return <NonUserBubble key={message.id} message={message} isLast={i === messages.length - 1 ? true : false} />
    })

    const conversationList = conversations.length ? conversations?.map((convo) => <ConvoCard key={convo.id} convo={convo} mini={true} current={convo.id == id ? true : false} />) : null

    return (
        <>
            <div className={"row no-gutters" + (isDark.current === 'true' ? " bg-dark" : "")} >
                <div className='col-sm-3 p-0 d-none d-md-block scrn-height overflow-scroll b-border-right'>
                    <div className="list-group rounded-0">
                        <li className={"list-group-item px-4 rounded-0 border-end-0 text-muted " + (isDark.current === 'true' ? " bg-dark" : "")}><h6 className="px-1">MESSAGE BOARD</h6></li>
                        {conversationList || <ConvoCardSkeletons mini={true} />}
                    </div>
                </div>
                <div className='col-md-9 c-pad scrn-height overflow-scroll'>
                    {displayMessages.length ? displayMessages : <h1 className="m-1 no-content-msg" >lets get this party started<span>❗</span></h1>}
                    <div ref={scrollPoint}></div>
                </div>
                <div className='col-sm-3 d-none d-md-block' ></div>
                <div className={'col-md-9 chat-input ' + (isDark.current === 'true' ? "bg-dark" : "bg-light")} >
                    <TextBox chatSocket={channel} />
                </div>
            </div>
        </>
    )
}

export default ChatRoom