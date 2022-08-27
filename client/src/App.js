import logo from './logo.svg';
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



function App() {
  const [user ,setUser] = useState(null) 
  const isDark = useRef(localStorage.getItem('darkmode')) 
  const [conversations ,setConversations] = useState([]) 
  const {id} = useParams()
  const navigate = useNavigate()
  

  useEffect(()=>{
    fetch('/auth')
    .then(resp => resp.ok ? resp.json() 
    .then(data => setUser(data)) : navigate('/login'))
  },[])

  console.log(localStorage.getItem('darkmode'))

  function conversationLoad() {
        fetch('/conversations')
        .then(resp => resp.json())
        .then(setConversations)
  }
  
  return (
    <>
    <ThemeContext.Provider value={isDark}>
    <userContext.Provider value={{user, setUser}}>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home convoState={{conversations, conversationLoad}}/>} />
      <Route path='login' element={<Login/>} />
      <Route path='/chatroom/:id' element={<ChatRoom convoState={{conversations, conversationLoad}}/>} />
    </Routes>
    <ToastContainer position="bottom-right" theme={isDark.current === 'true' ? 'dark' : 'light'} />
    </userContext.Provider>
    </ThemeContext.Provider>
    </>
  )
}
export default App;
