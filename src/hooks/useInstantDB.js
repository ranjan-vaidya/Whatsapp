import { init, id } from "@instantdb/react";


const db = init({
  appId: process.env.REACT_APP_APP_ID, 
});

export const useInstantDB = () => {
  const addMessage = async (senderId, receiverId, text) => {
    await db.transact(
      db.tx.messages[id()].update({
        senderId,
        receiverId,
        text,
        createdAt: new Date().toISOString(),
      })
    );
  };

  const useMessages = (currentUserId, contactId) => {
    const { isLoading, error, data } = db.useQuery({ messages: {} });
    const messages =
      data?.messages?.filter(
        (msg) =>
          (msg.senderId === currentUserId && msg.receiverId === contactId) ||
          (msg.senderId === contactId && msg.receiverId === currentUserId)
      ) || [];
    return { isLoading, error, messages };
  };

  return { addMessage, useMessages };
};
