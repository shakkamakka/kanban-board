import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";



const Task = () => {  
  const {id}=useParams();
  const {
    data:dataTask,
    isLoading,
    error,
  } = useFetch(`http://localhost:3000/tasks/${id}`);

  return (
  <section className="page task">
    {isLoading && <div>loading...</div>}
    {error && <div>{error}</div>}
    {dataTask && 
    <div>
      <div className="task__heading">
        <h2>{dataTask.title}</h2>
        <h4>Status:</h4>
      </div>
      <div>{dataTask.description}</div>
    </div>}
  </section>   
  )
};

export default Task;
