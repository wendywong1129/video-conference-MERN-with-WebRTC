const JoinRoomInput = (props) => {
  const { placeholder, value, changeHandler, keyDownHandler } = props;

  return (
    <input
      className="join_room_input"
      placeholder={placeholder}
      value={value}
      onChange={changeHandler}
      onKeyDown={keyDownHandler}
    />
  );
};

export default JoinRoomInput;
