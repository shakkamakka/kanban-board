import { Link } from "react-router-dom";
import ModalCreate from "./ModalCreate";

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <h1>kanban board</h1>
      </Link>
      <ModalCreate />
    </nav>
  );
};

export default Nav;
