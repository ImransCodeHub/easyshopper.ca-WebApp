import React from 'react';

// Future implementation of Chatbot Controls
const ChatControls = ({ onEndChat, onCancel }) => {
  return (
    <div className="vfrc-prompt c-koXsWI">
      <button
        tabIndex="-1"
        label="End Chat"
        className="c-dzcdPv vfrc-button c-jjMiVY vfrc-button--primary c-bXTvXv c-bXTvXv-XJvOL-type-warn"
        onClick={onEndChat}
      >
        End Chat
      </button>
      <button
        tabIndex="-1"
        label="Cancel"
        className="c-dzcdPv vfrc-button c-jjMiVY vfrc-button--primary c-bXTvXv c-bXTvXv-igaDqE-type-subtle"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default ChatControls;
