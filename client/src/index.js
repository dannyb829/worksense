import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import actioncable from 'actioncable'

const root = ReactDOM.createRoot(document.getElementById('root'));

// websocket held in root of app so as not to re initiate WS connection on any rerenders

const chatSocket = {}
chatSocket.cable = actioncable.createConsumer('ws://localhost:3000/cable')
export const SocketContext = createContext()

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketContext.Provider value={chatSocket.cable} >
        <App />
      </SocketContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
