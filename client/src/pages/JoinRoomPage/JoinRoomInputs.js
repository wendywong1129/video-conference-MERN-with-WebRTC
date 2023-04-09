import JoinRoomInput from "./JoinRoomInput";

const JoinRoomInputs = (props) => {
  const {
    roomIdValue,
    setRoomIdValue,
    nameValue,
    setNameValue,
    isRoomHost,
    joinRoomHandler,
  } = props;

  const handleRoomIdValueChange = (event) => {
    setRoomIdValue(event.target.value);
  };

  const handleNameValueChange = (event) => {
    setNameValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      joinRoomHandler();
    }
  };

  return (
    <div className="join_room_inputs_container">
      {!isRoomHost && (
        <JoinRoomInput
          placeholder="Meeting ID"
          value={roomIdValue}
          changeHandler={handleRoomIdValueChange}
        />
      )}
      <JoinRoomInput
        placeholder="Your Name"
        value={nameValue}
        changeHandler={handleNameValueChange}
        keyDownHandler={handleKeyDown}
      />
    </div>
  );
};

export default JoinRoomInputs;
