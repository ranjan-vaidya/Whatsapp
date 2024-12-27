import { openDB } from "idb";
/*
const DB_NAME = "ChatApp";
const STORE_NAME = "messages";

// Initialize the database
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const addMessageToIndexedDB = async (message) => {
  const db = await initDB();
  await db.put(STORE_NAME, message);
};

export const getMessagesFromIndexedDB = async (contactId, currentUserId) => {
  const db = await initDB();
  const allMessages = await db.getAll(STORE_NAME);
  return allMessages.filter(
    (msg) =>
      (msg.senderId === currentUserId && msg.receiverId === contactId) ||
      (msg.senderId === contactId && msg.receiverId === currentUserId)
  );
};
*/

const DB_NAME = "ChatApp";
const STORE_NAME = "messages";

// Initialize the database
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

// Add a message to IndexedDB
export const addMessageToIndexedDB = async (message) => {
  const db = await initDB();
  await db.put(STORE_NAME, message);
};

// Get messages from IndexedDB for a specific conversation
export const getMessagesFromIndexedDB = async (contactId, currentUserId) => {
  const db = await initDB();
  const allMessages = await db.getAll(STORE_NAME);
  return allMessages.filter(
    (msg) =>
      (msg.senderId === currentUserId && msg.receiverId === contactId) ||
      (msg.senderId === contactId && msg.receiverId === currentUserId)
  );
};
