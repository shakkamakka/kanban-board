
import { useEffect, useState } from 'react'
import { Card, Column, Row } from '../components'


const Dashboard = () => {
  const [status, setStatus]=useState([]);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState({})

  useEffect(() => {
    fetch('http://localhost:8000/status')
    .then(res=>{
      return res.json(); //asynchronous
    })
    .then(dataStatus => {
      setStatus(dataStatus)
    })
    .catch(err => setError(err))
  }, [])

  interface statusProps{
    id:number;
    value:string
  }
  interface ticketProps{
    id:number;
    title:string;
    status: number;
    description:string
  }
  

  return (
    <div className='dashboard'>
      <Row>
        {status.map((s:statusProps)=>
        <Column 
          key={s.id} 
          title={s.value} 
          count={tickets.filter((t:ticketProps)=>s.id === t.status).length}
        >          
          {tickets.length > 0 && tickets.filter((t:ticketProps)=>s.id === t.status).map((ticket:ticketProps)=> <Card key={ticket.id} {...ticket} />)}
        </Column>
        )}
      </Row>
    </div>
  )
}

export default Dashboard