import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Task, CreateTask } from "./views";
import { Nav } from "./components";

function App() {
  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task/:id" element={<Task />} />
        <Route path="/create" element={<CreateTask />} />
      </Routes>
    </div>
  );
}

export default App;
