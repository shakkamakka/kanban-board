
import { Row, List } from '../components'
import useFetch from '../hooks/useFetch';


const Dashboard = () => {
  const {data: dataStatuses, isLoading, error} = useFetch("https://my-json-server.typicode.com/shakkamakka/data/status")

  interface statusProps{
    id:number;
    value:string
  }
  return (
    <div className='dashboard'>
      <Row>
        {isLoading && <div>loading...</div>}
        {error && <div>{ error }</div>}
        {dataStatuses && dataStatuses.map((s:statusProps)=> <List key= {s.id} id={s.id} value={s.value} />)}
      </Row>
    </div>
  )
}

export default Dashboard