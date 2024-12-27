import React from "react";
import { useGlobalState } from "../context/GlobalState";
import { Image } from "react-bootstrap";

const ContactList = () => {
  const { state, dispatch } = useGlobalState(); // Access state and dispatch from the context

  console.log("Contacts:", state.contacts); // Debugging: Check if contacts are being retrieved

  return (
    <div className="contact-list">
      {state.contacts.map((contact) => (
        <div
          key={contact.id}
          onClick={() => dispatch({ type: "SET_CURRENT_CONTACT", payload: contact })}
          className={`contact ${state.currentContact?.id === contact.id ? "active" : ""}`}
        >
          <Image src={contact.avatar} />
          {contact.name}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
