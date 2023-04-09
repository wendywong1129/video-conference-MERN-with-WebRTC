import { useEffect } from "react";
// import { connect } from "react-redux";
import { useSelector } from "react-redux";
import * as webRTCHandler from "../../utils/webRTCHandler";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import VideoSection from "./VideoSection/VideoSection";
import RoomLabel from "./VideoSection/RoomLabel";
import Overlay from "./Overlay";
import "./RoomPage.css";

const RoomPage = (props) => {
  // const { isRoomHost, identity, roomId, isShowOverlay,isConnectOnlyWithAudio } = props;
  const {
    isRoomHost,
    identity,
    roomId,
    isShowOverlay,
    isConnectOnlyWithAudio,
  } = useSelector((state) => state);

  useEffect(() => {
    // Route Guard
    if (!isRoomHost && !roomId) {
      const siteUrl = window.location.origin;
      window.location.href = siteUrl;
    }
    webRTCHandler.getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      roomId,
      isConnectOnlyWithAudio
    );
  }, []); // eslint-disable-line

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <RoomLabel roomId={roomId} />
      {isShowOverlay && <Overlay />}
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     ...state,
//   };
// };

// export default connect(mapStateToProps)(RoomPage);
export default RoomPage;
