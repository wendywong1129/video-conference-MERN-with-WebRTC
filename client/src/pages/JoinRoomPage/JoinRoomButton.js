const JoinRoomButton = (props) => {
  const { buttonText, cancelButton = false, onClickHandler } = props;

  const buttonClassName = cancelButton
    ? "join_room_cancel_button"
    : "join_room_success_button";

  return (
    <button className={buttonClassName} onClick={onClickHandler}>
      {buttonText}
    </button>
  );
};

export default JoinRoomButton;
