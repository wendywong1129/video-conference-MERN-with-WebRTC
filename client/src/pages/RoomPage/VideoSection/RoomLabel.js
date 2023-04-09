const RoomLabel = (props) => {
  const { roomId } = props;

  return (
    <div className="room_label">
      <p className="room_label_paragraph">Meeting ID: {roomId}</p>
    </div>
  );
};

export default RoomLabel;
