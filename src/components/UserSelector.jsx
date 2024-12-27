import React from "react";
import { useGlobalState } from "../context/GlobalState";
import { Button } from "react-bootstrap";

const UserSelector = () => {
  const { state, dispatch } = useGlobalState();

    const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    const selectedUser = state.contacts.find((user) => user.id === selectedUserId);
    dispatch({ type: "SET_CURRENT_USER", payload: selectedUser });
  };

  return (
    <>    
    <div className="user-selector">
     
      <label htmlFor="user-select" className="text-3xl font-bold underline">Logged in as: </label>
      <select
        id="user-select"
        value={state.currentUser.id}
        onChange={handleUserChange}
      >
        <option value={state.currentUser.id}>{state.currentUser.name}</option>
        {state.contacts
          .filter((contact) => contact.id !== state.currentUser.id)
          .map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.name}
            </option>
          ))}
      </select>
    </div>
    </>

  );
};

export default UserSelector;
