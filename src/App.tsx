import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Board } from "./views";
import { Nav } from "./components";

function App() {

  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;
