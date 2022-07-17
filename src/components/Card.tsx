import { Link } from "react-router-dom";
import {TaskProps} from "../data/interface";


const Card = ({ id, title, description, status }: TaskProps) => {

  return (
    <div className="card" draggable="true">
      <span className="title">{title}</span>
      <span className="description">{description}</span>
      <Link to={`/task/${id}`} >View task </Link>
    </div>
  );
};

export default Card;
