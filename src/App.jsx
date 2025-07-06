import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TechTutor from "./pages/TechTutor";
import CodeMate from "./pages/CodeMate";
import ProjectPal from "./pages/ProjectPal";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TechTutor />} />
        <Route path="/codemate" element={<CodeMate />} />
        <Route path="/projectpal" element={<ProjectPal />} />
      </Routes>
    </Router>
  );
}

export default App;
