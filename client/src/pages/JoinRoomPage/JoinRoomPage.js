import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
// import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { setIsRoomHost } from "../../store/actions";
import JoinRoomTitle from "./JoinRoomTitle";
import JoinRoomContent from "./JoinRoomContent";
import "./JoinRoomPage.css";

const JoinRoomPage = () => {
  // const search = useLocation().search;
  const [searchParams] = useSearchParams();

  // const { setIsRoomHostAction, isRoomHost } = props;
  const isRoomHost = useSelector((state) => state.isRoomHost);

  const dispatch = useDispatch();

  useEffect(() => {
    // const isHost = new URLSearchParams(search).get("host");
    const isHost = searchParams.get("host");

    if (isHost) {
      // setIsRoomHostAction(isHost);
      dispatch(setIsRoomHost(isHost));
    }
  }, []); // eslint-disable-line

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent isRoomHost={isRoomHost} />
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     ...state,
//   };
// };

// const mapActionsToProps = (dispatch) => {
//   return {
//     setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
//   };
// };

// export default connect(mapStateToProps, mapActionsToProps)(JoinRoomPage);
export default JoinRoomPage;
