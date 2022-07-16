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
      <Link to={`/ticket/${id}`} >view ticket </Link>
    </div>
  );
};

export default Card;
