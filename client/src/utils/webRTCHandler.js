import Peer from "simple-peer";
import store from "../store/store";
import { setIsShowOverlay, setMessages } from "../store/actions";
import * as wss from "./wss";

const defaultConstraints = {
  audio: true,
  video: { width: "480", height: "360" },
};

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

let localStream;
export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null,
  isOnlyAudio
) => {
  const constraints = isOnlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log("Get local stream successfully!");
      localStream = stream;

      showLocalVideoPreview(localStream);

      store.dispatch(setIsShowOverlay(false));

      isRoomHost
        ? wss.createNewRoom(identity, isOnlyAudio)
        : wss.joinRoom(roomId, identity, isOnlyAudio);
    })
    .catch((error) => {
      console.log("Failed to get localStream!");
      console.log(error);
    });
};

let peers = {};
let streams = [];

// STUN Server
const getConfiguration = () => {
  return {
    iceSevers: [
      {
        urls: "stun.l.google.com:19302",
      },
    ],
  };
};

export const prepareNewPeerConnection = (
  connUserSocketId,
  isInitiatorReady
) => {
  const configuration = getConfiguration();

  peers[connUserSocketId] = new Peer({
    initiator: isInitiatorReady,
    config: configuration,
    stream: localStream,
  });

  // peer1 => initiator
  // peer1.on('signal', data => {})
  // peer2 => respondent
  // peer2.on('signal', data => {})
  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      // initiator's data: a webRTC offer, answer, or ice candidate
      // respondent's data: a webRTC offer, answer, or ice candidate
      signal: data,
      // initiator's socketId
      // respondent's socketId
      connUserSocketId,
    };

    wss.signalPeerData(signalData);
  });

  // get remote stream
  peers[connUserSocketId].on("stream", (stream) => {
    console.log("Get remote stream successfully!");
    addStream(stream, connUserSocketId);

    streams = [...streams, stream];
  });
};

export const handleSignalingData = (data) => {
  // peer2 => respondent
  // peer2.signal(data)
  // data.connUserSocketId => respondent's socketId
  // data.signal => initiator's data
  // peer1 => initiator
  // peer1.signal(data)
  // data.connUserSocketId => initiator's socketId
  // data.signal => respondent's data
  peers[data.connUserSocketId].signal(data.signal);
};

export const removePeerConnection = (data) => {
  // user's(who is going to leave room) socketId
  const { socketId } = data;

  const videoContainer = document.getElementById(socketId);
  const videoElement = document.getElementById(`${socketId}-video`);

  if (videoContainer && videoElement) {
    const tracks = videoElement.srcObject.getTracks();

    tracks.forEach((track) => track.stop());

    videoElement.srcObject = null;
    videoContainer.removeChild(videoElement);
    videoContainer.parentNode.removeChild(videoContainer);

    // delete user's data in the Peers Object
    if (peers[socketId]) {
      // destroy peers connection of the user
      peers[socketId].destroy();
    }
    // delete peers connection data of the user
    delete peers[socketId];
  }
};

const showLocalVideoPreview = (stream) => {
  const videosContainer = document.getElementById("videos_portal");
  videosContainer.classList.add("videos_portal_styles");

  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video_track_container");

  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);

  // user is connected only with audio
  if (store.getState().isConnectOnlyWithAudio) {
    videoContainer.appendChild(onlyAudioLabel());
  }

  videosContainer.appendChild(videoContainer);
};

const addStream = (stream, connUserSocketId) => {
  const videosContainer = document.getElementById("videos_portal");
  const videoContainer = document.createElement("div");

  videoContainer.id = connUserSocketId;
  videoContainer.classList.add("video_track_container");

  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoElement.addEventListener("click", () => {
    if (videoElement.classList.contains("full_screen")) {
      videoElement.classList.remove("full_screen");
    } else {
      videoElement.classList.add("full_screen");
    }
  });

  videoContainer.appendChild(videoElement);

  const participants = store.getState().participants;
  const participant = participants.find((p) => p.socketId === connUserSocketId);

  // peer connection user is connected only with audio
  if (participant?.isOnlyAudio) {
    videoContainer.appendChild(onlyAudioLabel(participant.identity));
  } else {
    videoContainer.style.position = "static";
  }

  videosContainer.appendChild(videoContainer);
};

const onlyAudioLabel = (identity = "") => {
  const labelContainer = document.createElement("div");
  labelContainer.classList.add("label_only_audio_container");

  const label = document.createElement("p");
  label.classList.add("label_only_audio_text");
  label.innerHTML =
    identity.length > 0
      ? `${identity} is connected only with audio`
      : "You are connected only with audio";
  labelContainer.appendChild(label);

  return labelContainer;
};

export const toggleMic = (isMuted) => {
  localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
};

export const toggleCamera = (isDisabled) => {
  localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
};

export const toggleScreenShare = (
  isScreenSharingActive,
  screenSharingStream = null
) => {
  if (isScreenSharingActive) {
    switchVideoTracks(localStream);
  } else {
    switchVideoTracks(screenSharingStream);
  }
};

const switchVideoTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let i in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[i].kind
        ) {
          console.log(peers);
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[i],
            peers[socket_id].streams[0]
          );
        }
      }
    }
  }
};
