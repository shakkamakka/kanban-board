import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TaskProps } from "../data/interface";
import useFetch from "../hooks/useFetch";



const Task = () => {  
  const {statusId, id}=useParams();
  const [data, setData] = useState<TaskProps>();
  const [status, setStatus] = useState(0);

  // we take the whole status object because nested arrays aren't supported in JSON-server
  const {
    data:dataStatus,
    isLoading,
    error,
  } = useFetch(`http://localhost:3000/status/${statusId}`);

  useEffect(()=>{
    if(isLoading)return;
    // set Status
    setStatus(dataStatus.value);
    // filter task we need out of the status object
    const filteredTasks = dataStatus?.tasks.filter((task:TaskProps)=> task.id === Number(id))[0];
    setData(filteredTasks);
  }, [dataStatus])

  return (
  <section className="page task">
    {isLoading && <div>loading...</div>}
    {error && <div>{error}</div>}
    {data && 
    <div>
      <div className="task__heading">
        <h2>{data.title}</h2>
        <h4>Status: {status}</h4>
      </div>
      <div>{data.description}</div>
    </div>}
  </section>   
  )
};

export default Task;
