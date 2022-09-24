import { useEffect, useState, useRef, useContext } from 'react';
import './App.css';
import Home from './PAGES/Home';
import Login from './PAGES/Login'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import NavBar from './ELEMENTS/Navbar';
import ChatRoom from './PAGES/ChatRoom';
import userContext from './CONTEXT/userContext';
import ThemeContext from './CONTEXT/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProfile from './PAGES/EditProfile';
import { SocketContext } from '.';




function App() {
  //STATE
  const [user, setUser] = useState(null)
  const [conversations, setConversations] = useState([])
  //REF
  const isDark = useRef(localStorage.getItem('darkmode'))
  //NAVIGATE
  const navigate = useNavigate()
  //CONTEXT
  const messageBoardSocket = useContext(SocketContext)
  const [boardChannel, setBoardChannel] = useState(null)

  useEffect(()=>{
    document.body.style.background = isDark.current === 'true' ? '#212529' : '#FFF'
  },[isDark.current])

  useEffect(() => {
    // runs authorization on each rerender, if user not logged in then redirects to login
    fetch('/auth')
      .then(resp => resp.ok ? resp.json()
        .then(data => setUser(data)) : navigate('/login'))
  }, [])

  useEffect(() => {

    const messageBoardChannel = messageBoardSocket.subscriptions.create(
      { channel: 'ConversationsChannel' },
      {
        // loads messages in conversation upon subscription
        connected(e) { setBoardChannel(messageBoardChannel) },
        disconnected() { console.log('disconnected') },
        // reloads messages
        received(e) { setConversations(e) }
      }
    )
    // setBoardChannel(messageBoardChannel)
    return () => {
      // if (boardChannel) 
      boardChannel?.unsubscribe()
    }

  }, [messageBoardSocket.subscriptions])


  return (
    <>
      <ThemeContext.Provider value={isDark}>
        <userContext.Provider value={{ user, setUser }}>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home conversations={conversations} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<EditProfile />} />
            <Route path='/chatroom/:id' element={<ChatRoom conversations={conversations} />} />
          </Routes>
          <ToastContainer position="bottom-right" theme={isDark.current === 'true' ? 'dark' : 'light'} />
        </userContext.Provider>
      </ThemeContext.Provider>
    </>
  )
}
export default App;
