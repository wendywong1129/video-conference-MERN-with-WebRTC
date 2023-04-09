import { useNavigate } from "react-router-dom";
import JoinRoomButton from "./JoinRoomButton";

const JoinRoomButtons = (props) => {
  const { isRoomHost, joinRoomHandler } = props;

  const successButtonText = isRoomHost ? "Host" : "Join";

  const navigate = useNavigate();

  const pushToIntroductionPage = () => {
    navigate("/");
  };

  return (
    <div className="join_room_buttons_container">
      <JoinRoomButton
        buttonText={successButtonText}
        onClickHandler={joinRoomHandler}
      />
      <JoinRoomButton
        buttonText="Cancel"
        cancelButton
        onClickHandler={pushToIntroductionPage}
      />
    </div>
  );
};

export default JoinRoomButtons;
