import useFetch from "../hooks/useFetch";
import Card from "./Card";
import {TaskProps, ListProps} from "../data/interface"



const List: React.FC<ListProps> = ({ id, value}) => {
  const {
    data: dataTasks,
    isLoading,
    error,
  } = useFetch(`http://localhost:3000/tasks?status=${id}`)
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
