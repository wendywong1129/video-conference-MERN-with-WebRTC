import { useState } from "react";
// import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRoomExists } from "../../utils/api";
import {
  setIsConnectOnlyWithAudio,
  setIdentity,
  setRoomId,
} from "../../store/actions";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import ErrorMessage from "./ErrorMessage";
import JoinRoomInputs from "./JoinRoomInputs";
import JoinRoomButtons from "./JoinRoomButtons";

const JoinRoomContent = (props) => {
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  // const {
  //   isRoomHost,
  //   isConnectOnlyWithAudio,
  //   setIsConnectOnlyWithAudioAction,
  //   setRoomIdAction,
  //   setIdentityAction,
  // } = props;
  const { isRoomHost, isConnectOnlyWithAudio } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleSetIsConnectOnlyWithAudio = (isConnectOnlyWithAudio) =>
    dispatch(setIsConnectOnlyWithAudio(isConnectOnlyWithAudio));

  const handleJoinRoom = async () => {
    // setIdentityAction(nameValue);
    dispatch(setIdentity(nameValue));
    if (isRoomHost) {
      createRoom();
    } else {
      await joinRoom();
    }
  };

  const joinRoom = async () => {
    const responseMessage = await getRoomExists(roomIdValue);

    const { roomExists, full } = responseMessage;

    if (roomExists) {
      if (full) {
        setErrorMessage(
          "The number of participants in the meeting is limited!"
        );
      } else {
        // setRoomIdAction(roomIdValue);
        dispatch(setRoomId(roomIdValue));
        navigate("/room");
      }
    } else {
      setErrorMessage("The meeting ID does not exist!");
    }
  };

  const createRoom = () => {
    navigate("/room");
  };

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
        joinRoomHandler={handleJoinRoom}
      />
      <OnlyWithAudioCheckbox
        isConnectOnlyWithAudio={isConnectOnlyWithAudio}
        setIsConnectOnlyWithAudioHandler={handleSetIsConnectOnlyWithAudio}
      />
      <ErrorMessage errorMessage={errorMessage} />
      <JoinRoomButtons
        isRoomHost={isRoomHost}
        joinRoomHandler={handleJoinRoom}
      />
    </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     ...state,
//   };
// };

// const mapActionsToProps = (dispatch) => {
//   return {
//     setIsConnectOnlyWithAudioAction: (isConnectOnlyWithAudio) =>
//       dispatch(setIsConnectOnlyWithAudio(isConnectOnlyWithAudio)),
//     setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
//     setIdentityAction: (identity) => dispatch(setIdentity(identity)),
//   };
// };

// export default connect(mapStateToProps, mapActionsToProps)(JoinRoomContent);
export default JoinRoomContent;
