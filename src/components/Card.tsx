import { Link } from "react-router-dom";

type CardProps = {
  id: number;
  title: string;
  description: string;
  status: number;
};

const Card = ({ id, title, description, status }: CardProps) => {

  return (
    <div className="card" draggable="true">
      <span className="title">{title}</span>
      <span className="description">{description}</span>
      <Link to={`/task/${id}`} >View task </Link>
    </div>
  );
};

export default Card;
