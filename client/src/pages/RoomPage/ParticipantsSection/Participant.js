import React from "react";

const Participant = (props) => {
  const {
    identity,
    lastItem,
    participant,
    setActiveConversationAction,
    socketId,
  } = props;

  const handleOpenActiveConversation = () => {
    if (participant.socketId !== socketId) {
      setActiveConversationAction(participant)
    }
  };

  return (
    <>
      <p
        className="participants_paragraph"
        onClick={handleOpenActiveConversation}
      >
        {identity}
      </p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
};

export default Participant;
