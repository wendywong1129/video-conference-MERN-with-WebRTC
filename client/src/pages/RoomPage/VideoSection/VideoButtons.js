import { useSelector } from "react-redux";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import SwitchToScreenSharingButton from "./SwitchToScreenSharingButton";

const VideoButtons = () => {
  const isConnectOnlyWithAudio = useSelector(
    (state) => state.isConnectOnlyWithAudio
  );

  return (
    <div className="video_buttons_container">
      <MicButton />
      {!isConnectOnlyWithAudio && <CameraButton />}
      <LeaveRoomButton />
      {!isConnectOnlyWithAudio && <SwitchToScreenSharingButton />}
    </div>
  );
};

export default VideoButtons;
