import React, { useState } from "react";
import { useGlobalState } from "../context/GlobalState";

const Onboarding = ({ onComplete }) => {
  const { dispatch } = useGlobalState();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() && avatar.trim()) {
      const newUser = {
        id: `user${Date.now()}`, // Generate a unique ID
        name,
        avatar,
      };

      // Set current user in global state
      dispatch({ type: "SET_CURRENT_USER", payload: newUser });

      // Add to contacts dynamically
      dispatch({ type: "SET_MESSAGES", payload: [], contactId: newUser.id });

      onComplete(); // Notify that onboarding is complete
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="onboarding">
      <h1>Create Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Enter avatar URL"
          />
        </label>
        <button type="submit">Start Chatting</button>
      </form>
    </div>
  );
};

export default Onboarding;
