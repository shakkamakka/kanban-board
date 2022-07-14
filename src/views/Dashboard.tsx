
import { Card, Column, Row } from '../components'
import status from '../data/status.json'
import tickets from '../data/tickets.json'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Row>
        {status.map((s)=>
        <Column key={s.id} title={s.value} count={tickets.filter((t)=>s.id === t.status).length}>          
          {tickets.filter((t)=>s.id === t.status).map((ticket)=> <Card key={ticket.id} {...ticket} />)}
        </Column>
        )}
      </Row>
    </div>
  )
}

export default Dashboard