import { Avatar } from "@material-ui/core"
import "./SidebarChat.css"
const SidebarChat = () => {
  return (
  <div className="sidebarChat">
   <Avatar/>
   <div className="sidebarChat_info">
       <h2>room name</h2>
       <p>This is the last chat</p>
   </div>
  </div>
  );
};

export default SidebarChat;
