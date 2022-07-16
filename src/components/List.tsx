import useFetch from "../hooks/useFetch";
import Card from "./Card";

interface statusProps {
  id: number;
  value: string;
}
interface CardProps {
  id: number;
  title: string;
  status: number;
  description: string;
}

const List: React.FC<statusProps> = ({ id, value }) => {
  const {
    data: dataTickets,
    isLoading,
    error,
  } = useFetch(
    `https://my-json-server.typicode.com/shakkamakka/data/tickets?status=${id}`
  );
  const count = dataTickets.length;

  return (
    <div className="column">
      <h3>
        {value} <span className="count">{count}</span>
      </h3>
      {isLoading && <div>loading...</div>}
      {error && <div>{error}</div>}
      {dataTickets &&
        dataTickets.map(({ id, title, status, description }: CardProps) => (
          <Card
            key={id}
            id={id}
            title={title}
            status={status}
            description={description}
          />
        ))}
    </div>
  );
};

export default List;
