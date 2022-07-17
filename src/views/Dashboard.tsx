import { useEffect } from "react";
import { Row, List } from "../components";
import { ListProps } from "../data/interface";
import useFetch from "../hooks/useFetch";

const Dashboard = () => {
  const {
    data: dataList,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/status");


  return (
    <div className="dashboard">
      <Row>
        {isLoading && <div>loading...</div>}
        {error && <div>{error}</div>}

        {dataList &&
          dataList.map((s: ListProps) => (
            <List key={s.id} id={s.id} value={s.value} />
          ))}
      </Row>
    </div>
  );
};

export default Dashboard;
