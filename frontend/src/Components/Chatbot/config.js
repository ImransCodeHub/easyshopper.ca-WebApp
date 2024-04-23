// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
// import Options from "./Options.js";
import avatar from '../Assets/avatarBot.png';
import localUserAvatar from '../Assets/avatarUser.png';

// Fetching the user avatar from google OAuth
/*
const accessToken = localStorage.getItem('token');
const fetchUserAvatar = async () => {
  try {
    const response = fetch('/api/userGoogleInfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    const userGoogleAvatar = data.user.picture;
    if (userGoogleAvatar === null) {
      return localUserAvatar;
    }
    return userGoogleAvatar;
  }
  
  catch (error) {
    console.error("Error fetching user google avatar:", error);
  } 
}
*/

const config = {
  botName: "AngryHelper",

  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#efefef",
    },
  },

  initialMessages: [createChatBotMessage(`Hi there easyshopper! How can I NOT help you today?`)],

  // This is so cool!
  customComponents: {
    header: () => <div className="custom-chat-header">You can ask me anything!</div>,
    // Holyshit it worked! - Imran
    botAvatar: (props) => (
      <div className="react-chatbot-kit-chat-bot-avatar-container" {...props}>
        <img src={avatar} alt="Bot Avatar" />
      </div>
    ),

    userAvatar: (props) => (
      <div className="react-chatbot-kit-user-bot-avatar-container" {...props}>

        <img src={localUserAvatar} alt="User Avatar" // Replace this with the user's avatar from google OAuth 
        // Add more styling here in the future
        style={{height: '40px', width: '40px', marginLeft: '8px'}}/>
      </div>
    ),
  }, 
  
  widgets: [
    {
      widgetName: "Orders",
    },
  ]  

}

export default config