import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  <section className="page task" data-id={statusId}>
    {isLoading && <div>loading...</div>}
    {error && <div>{error}</div>}
    {data && 
    <div>
      <div className="task__heading">
        <span className="task__badge">{status}</span>
        <h2>{data.title}</h2>
      </div>
      <div className="task__description">{data.description}</div>
      <div className="task__footer">
        <Link to="/" className="btn_secondary">Go Back</Link>
        <button className="btn_secondary">Edit</button>
      </div>
    </div>}
  </section>   
  )
};

export default Task;
