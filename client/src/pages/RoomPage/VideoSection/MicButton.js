import { useState } from "react";
import * as webRTCHandler from "../../../utils/webRTCHandler";
import MicButtonImg from "../../../resources/images/mic.svg";
import MicButtonImgOff from "../../../resources/images/micOff.svg";

const MicButton = () => {
  const [isMicMuted, setIsMicMuted] = useState(false);

  const handleMicButtonPressed = () => {
    webRTCHandler.toggleMic(isMicMuted);
    setIsMicMuted(!isMicMuted);
  };

  return (
    <div className="video_button_container">
      <img
        className="video_button_image"
        src={isMicMuted ? MicButtonImgOff : MicButtonImg}
        alt="mic"
        onClick={handleMicButtonPressed}
      />
    </div>
  );
};

export default MicButton;
