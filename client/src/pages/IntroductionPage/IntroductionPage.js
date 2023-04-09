import { useEffect } from "react";
// import { connect } from "react-redux";
// import { setIsRoomHost } from "../../store/actions";
import { useDispatch } from "react-redux";
import { setIsRoomHost } from "../../store/actions";
import ConnectingButtons from "./ConnectingButtons";
import logo from "../../resources/images/logo.png";
import "./IntroductionPage.css";

const IntroductionPage = () => {
  // const { setIsRoomHostAction } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    // setIsRoomHostAction(false);
    dispatch(setIsRoomHost(false));
  }, []); // eslint-disable-line

  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <img className="introduction_page_image" src={logo} alt="logo" />
        <ConnectingButtons />
      </div>
    </div>
  );
};

// const mapActionsToProps = (dispatch) => {
//   return {
//     setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
//   };
// };

// export default connect(null, mapActionsToProps)(IntroductionPage);
export default IntroductionPage;
