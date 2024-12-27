import React from "react";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import UserSelector from "./components/UserSelector";

const App = () => {
  return (
    <div className="main-container">
      <div className="sidebar">
        <UserSelector /> 
        <ContactList />
      </div>
      <div className="wrapper">
        <ChatWindow />
        <MessageInput />
      </div>
    </div>
  );
};

export default App;
