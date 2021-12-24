import { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import MicIcon from '@material-ui/icons/Mic';
import "./Chat.css";
import axios from "./axios"

const Chat = ({messages}) => {

  const [input, setInput] = useState("")

  const sendMessage=async (e)=>{
    e.preventDefault()

    await axios.post("/messages/new",{
      message:input,
      name:"Demo app",
      timestamp:"night",
      received:false
    })

    setInput("")
  }

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_headerInfo">
          <h3>room</h3>
          <p>
            last seen at...
            <span className="chat_timestamp">{new Date().toUTCString()}</span>
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message)=>{
            return <p className={`chat_message ${message.received && "chat_receiver"}`}>
            <span className="chat_name">{message.name}</span>
               {message.message}
            <span className="chat_timestamp">{message.timestamp}</span>
          </p>
        })}
       
      </div>

      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message" type="text" />
          <button type="submit" onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
