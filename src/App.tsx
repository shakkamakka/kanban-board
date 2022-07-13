import './App.scss'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Dashboard, Ticket} from './views/';
import { Nav } from './components';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ticket/:id" element={<Ticket />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
