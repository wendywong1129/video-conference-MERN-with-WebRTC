// import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { setActiveConversation } from "../../../store/actions";
import Participant from "./Participant";

const Participants = (props) => {
  // const { participants, setActiveConversationAction, socketId } = props;
  const { participants, socketId } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleSetActiveConversation = (activeConversation) => {
    dispatch(setActiveConversation(activeConversation));
  };

  return (
    <div className="participants_container">
      {participants.map((participant, index) => {
        return (
          <Participant
            key={participant.identity}
            identity={participant.identity}
            lastItem={participants.length === index + 1}
            participant={participant}
            setActiveConversationAction={handleSetActiveConversation}
            socketId={socketId}
          />
        );
      })}
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
//     setActiveConversationAction: (activeConversation) => {
//       dispatch(setActiveConversation(activeConversation));
//     },
//   };
// };

// export default connect(mapStateToProps, mapActionsToProps)(Participants);
export default Participants;
