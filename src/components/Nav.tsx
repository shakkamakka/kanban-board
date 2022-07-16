import { Link } from "react-router-dom";
import { BtnTicket } from ".";

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <h1>kanban board</h1>
      </Link>
      <BtnTicket />
    </nav>
  );
};

export default Nav;
