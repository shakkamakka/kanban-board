import { Link } from "react-router-dom";
import { BtnNewTask } from ".";

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <h1>kanban board</h1>
      </Link>
      <BtnNewTask />
    </nav>
  );
};

export default Nav;
