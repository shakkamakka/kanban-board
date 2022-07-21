import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Board, Task } from "./views";
import { Nav } from "./components";

function App() {
  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/task/:statusId/:id" element={<Task />} />
      </Routes>
    </div>
  );
}

export default App;
