import Actions from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case Actions.SET_IS_ROOM_HOST:
      return {
        ...state,
        isRoomHost: action.isRoomHost,
      };
    case Actions.SET_IS_CONNECT_ONLY_WITH_AUDIO:
      return {
        ...state,
        isConnectOnlyWithAudio: action.isConnectOnlyWithAudio,
      };
    case Actions.SET_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId,
      };
    case Actions.SET_IDENTITY:
      return {
        ...state,
        identity: action.identity,
      };
    case Actions.SET_IS_SHOW_OVERLAY:
      return {
        ...state,
        isShowOverlay: action.isShowOverlay,
      };
    case Actions.SET_PARTICIPANTS:
      return {
        ...state,
        participants: action.participants,
      };
    case Actions.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case Actions.SET_ACTIVE_CONVERSATION:
      return {
        ...state,
        activeConversation: action.activeConversation,
      };
    case Actions.SET_DIRECT_CHAT_HISTORY:
      return {
        ...state,
        directChatHistory: action.directChatHistory,
      };
    case Actions.SET_SOCKET_ID:
      return {
        ...state,
        socketId: action.socketId,
      };
    default:
      return state;
  }
};

export default reducer;
