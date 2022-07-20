import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Board, Task, CreateTask } from "./views";
import { Nav } from "./components";

function App() {
  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/task/:statusId/:id" element={<Task />} />
        <Route path="/create" element={<CreateTask />} />
      </Routes>
    </div>
  );
}

export default App;
