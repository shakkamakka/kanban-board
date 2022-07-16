import { useParams } from "react-router-dom";

const Ticket = () => {
  const {id}=useParams();

  return <div> Ticket: {id}</div>;
};

export default Ticket;
