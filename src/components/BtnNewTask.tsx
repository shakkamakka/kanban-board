import { TiTicket } from "react-icons/ti";
import { Link } from "react-router-dom";

const BtnNewTask = () => {
  return (
    <Link to="/create" className="btn_secondary">
      <TiTicket />
      New Task
    </Link>
  );
};

export default BtnNewTask;
