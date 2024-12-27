import React, { createContext, useReducer, useContext } from "react";

const GlobalContext = createContext();

const initialState = {
  currentUser: { id: "user1", name: "Ranjan" }, // Logged-in user
  contacts: [
    { id: "user1", name: "Ranjan", avatar: "https://media.istockphoto.com/id/2158302930/photo/studio-headshot-portrait-of-a-young-black-man.jpg?s=1024x1024&w=is&k=20&c=IyKcNUwOqvrQ41kWoW8ep6kpJW_T0qZ9YLRbLC4fXVs="},
    { id: "user2", name: "Lokesh", avatar: "https://media.istockphoto.com/id/1210331839/photo/young-actress-reading-scenario-on-stage-in-theatre.jpg?s=612x612&w=0&k=20&c=o_AKWy8pvvUj4II141Yz-0nwpaDZILz1X7HAhzKtGK8="},
    { id: "user3", name: "Sarvesh" , avatar: "https://media.istockphoto.com/id/1356258424/photo/posh-elegant-woman-in-evening-dress-with-a-glass-of-champagne-in-the-luxury-dressing-room.jpg?s=2048x2048&w=is&k=20&c=L9dDmSvaiXjz0Dqkz_1ELeF13MuM_k4zjoaFv5rZZ6Q="},
  ],
  currentContact: null,
  messages: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_CONTACT":
      return { ...state, currentContact: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: { ...state.messages, [action.contactId]: action.payload } };
    case "SET_CURRENT_USER": // New action to set current user
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};


// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook to use Global State
export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};
