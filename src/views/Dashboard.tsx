
import { Card, Column, Row } from '../components'
import status from '../data/status.json'
import tickets from '../data/tickets.json'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Row>
        {status.map((s)=>
        <Column key={s.id}>
          <h3>{s.value}</h3>
          {tickets.filter((t)=>s.id === t.status).map((ticket)=> <Card key={ticket.id} {...ticket} />)}
        </Column>
        )}
      </Row>
    </div>
  )
}

export default Dashboard