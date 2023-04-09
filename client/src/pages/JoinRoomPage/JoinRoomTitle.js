const JoinRoomTitle = ({ isRoomHost }) => {
  const titleText = isRoomHost ? "Hosting Meeting" : "Join Meeting";
  return <p className="join_room_title">{titleText}</p>;
};

export default JoinRoomTitle;
