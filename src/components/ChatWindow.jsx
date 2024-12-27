import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context/GlobalState";
import { useInstantDB } from "../hooks/useInstantDB";
import {
  addMessageToIndexedDB,
  getMessagesFromIndexedDB,
} from "../hooks/useIndexedDB";
import { Image } from "react-bootstrap";

const ChatWindow = () => {
  const { state } = useGlobalState();
  const { useMessages } = useInstantDB();
  const [localMessages, setLocalMessages] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  console.log(state)

  // Fetch messages from InstantDB
  const { isLoading, error, messages: instantMessages } = useMessages(
    state.currentUser?.id,
    state.currentContact?.id
  );

  // Fetch messages from IndexedDB
  useEffect(() => {
    const fetchIndexedDBMessages = async () => {
      if (state.currentContact) {
        const indexedMessages = await getMessagesFromIndexedDB(
          state.currentContact.id,
          state.currentUser.id
        );
        setLocalMessages(indexedMessages);
      }
    };

    fetchIndexedDBMessages();
  }, [state.currentContact, state.currentUser]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // If no contact is selected, show the message
  if (!state.currentContact) return <div className="start-chatting">
    <h4>

      Select a contact to start chatting
    </h4>
  </div>;

  // Render the messages (combine local and InstantDB when online)
  const combinedMessages = isOnline
    ? [...localMessages, ...(instantMessages || [])].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    )
    : localMessages;

  // Show loading and error states when online
  if (isOnline && isLoading) return <div>Loading messages...</div>;
  if (isOnline && error) return <div>Error loading messages: {error.message}</div>;

  return (
    <>
      <div className="user-name">

        <Image src={state.currentContact.avatar} />
        <h5>
          {state.currentContact.name}
        </h5>
      </div>
      <div className="chat-window">



        {combinedMessages.map((msg) => (
          <div
            key={msg.id}
            className={`position-fixed message ${msg.senderId === state.currentUser.id ? "sent" : "received"
              }`}
          >
            {msg.text}
          </div>
        ))}

      </div>
    </>

  );
};

export default ChatWindow;
