import React, { useState } from "react";
import { useGlobalState } from "../context/GlobalState";
import { useInstantDB } from "../hooks/useInstantDB";
import { addMessageToIndexedDB } from "../hooks/useIndexedDB";

const MessageInput = () => {
  const { state } = useGlobalState();
  const { addMessage } = useInstantDB();
  const [message, setMessage] = useState("");
  const isOnline = navigator.onLine;

  const handleSendMessage = async () => {
    if (message.trim() && state.currentContact) {
      const newMessage = {
        id: Date.now().toString(),
        senderId: state.currentUser.id,
        receiverId: state.currentContact.id,
        text: message,
        createdAt: new Date().toISOString(),
      };

      // Save to IndexedDB
      await addMessageToIndexedDB(newMessage);

      // Send to InstantDB if online
      if (isOnline) {
        await addMessage(
          newMessage.senderId,
          newMessage.receiverId,
          newMessage.text
        );
      }

      setMessage("");
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
