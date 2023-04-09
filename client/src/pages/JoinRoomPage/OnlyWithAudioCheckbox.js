import CheckImg from "../../resources/images/check.png";

const OnlyWithAudioCheckbox = (props) => {
  const { isConnectOnlyWithAudio, setIsConnectOnlyWithAudioHandler } = props;

  const handleConnectionTypeChange = () => {
    setIsConnectOnlyWithAudioHandler(!isConnectOnlyWithAudio);
  };

  return (
    <div className="checkbox_container">
      <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
        {isConnectOnlyWithAudio && (
          <img
            className="checkbox_image"
            src={CheckImg}
            alt="connect_only_with_audio"
          />
        )}
      </div>
      <p className="checkbox_container_paragraph">Connect only with audio</p>
    </div>
  );
};

export default OnlyWithAudioCheckbox;
