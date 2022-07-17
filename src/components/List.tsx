import useFetch from "../hooks/useFetch";
import Card from "./Card";


interface listProps {
  id: number;
  value: string;
}
interface taskProps{
  id: number;
  title: string;
  status: number;
  description: string;
}

const List: React.FC<listProps> = ({ id, value}) => {
  const {
    data: dataTasks,
    isLoading,
    error,
  } = useFetch(`https://my-json-server.typicode.com/shakkamakka/data/tasks?status=${id}`)
  const count = dataTasks.length;

  return (
    <div className="column" >
      <h3>
        {value} <span className="count">{count}</span>
      </h3>

      {isLoading && <div>loading...</div>}
      {error && <div>{error}</div>}

      {dataTasks &&
        dataTasks.map(({id, status, title, description}:TaskProps) => (
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
