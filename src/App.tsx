import "./App.scss";
import {PathContext, path} from "./context/path"
import { Route, Routes } from "react-router-dom";
import { Board, Task } from "./views";
import { Nav } from "./components";

function App() {

  return (
    <PathContext.Provider value={path}>
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/task/:statusId/:id" element={<Task />} />
      </Routes>
    </div>
    </PathContext.Provider>
  );
}

export default App;
