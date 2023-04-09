const ConnectingButton = (props) => {
  const { createRoomButton = false, buttonText, onClickHandler } = props;

  const buttonClassName = createRoomButton
    ? "create_room_button"
    : "join_room_button";

  return (
    <button className={buttonClassName} onClick={onClickHandler}>
      {buttonText}
    </button>
  );
};

export default ConnectingButton;
