import './App.css';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useEffect } from 'react';
import axios from  './axios'
import Pusher from 'pusher-js';;

function App() {
const[messages, setMessages] = useState([])
  useEffect(()=>{
    axios.get("/messages/sync").then((res)=>{
       setMessages(res.data)
    })
  },[])

  useEffect(()=>{
    var pusher = new Pusher('f93173d4a898e9baac40', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      // alert(JSON.stringify(data));
      setMessages([...messages,newMessage])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe()
    }
  },[messages])

  console.log(messages)

  return (
    <div className="App">
      <div className="app_body">
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
