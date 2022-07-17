import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";



const Task = () => {  
  const {id}=useParams();
  const {
    data:dataTask,
    isLoading,
    error,
  } = useFetch(`https://my-json-server.typicode.com/shakkamakka/data/tasks/${id}`);


  console.log(dataTask)
  return (
  <div className="task">
    {isLoading && <div>loading...</div>}
    {error && <div>{error}</div>}
    {dataTask && 
    <section>
      <div className="task__heading">
        <h2>{dataTask.title}</h2>
        <h4>Status:</h4>
      </div>
      <div>{dataTask.description}</div>
    </section>}
  </div>   
  )
};

export default Task;
