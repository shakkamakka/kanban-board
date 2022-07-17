import { useEffect } from "react";
import { Row, List } from "../components";
import useFetch from "../hooks/useFetch";

const Dashboard = () => {
  const {
    data: dataList,
    isLoading,
    error,
  } = useFetch("https://my-json-server.typicode.com/shakkamakka/data/status");


  interface listProps {
    id: number;
    value: string;
    tasks: {
      id: number;
      title: string;
      status: number;
      description: string;
    }[];
  }
  return (
    <div className="dashboard">
      <Row>
        {isLoading && <div>loading...</div>}
        {error && <div>{error}</div>}
        {dataList &&
          dataList.map((s: listProps) => (
            <List key={s.id} id={s.id} value={s.value} tasks={s.tasks} />
          ))}
      </Row>
    </div>
  );
};

export default Dashboard;
