import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connectWithSocketIOServer } from "./utils/wss";
import IntroductionPage from "./pages/IntroductionPage/IntroductionPage";
import JoinRoomPage from "./pages/JoinRoomPage/JoinRoomPage";
import RoomPage from "./pages/RoomPage/RoomPage";

function App() {
  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/join-room" element={<JoinRoomPage />} />
        <Route path="/room" element={<RoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
