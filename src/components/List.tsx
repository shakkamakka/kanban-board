import useFetch from "../hooks/useFetch";
import Card from "./Card";


interface statusProps {
  id: number;
  value: string;
  tasks: {
    id: number;
    title: string;
    status: number;
    description: string;
  }[];
}

const List: React.FC<statusProps> = ({ id, value, tasks}) => {
  const count = tasks.length;

  return (
    <div className="column" >
      <h3>
        {value} <span className="count">{count}</span>
      </h3>
      {tasks &&
        tasks.map(({id, status, title, description}) => (
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
