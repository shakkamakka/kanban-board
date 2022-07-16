import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Dashboard, Ticket } from './views';
import { Nav } from './components';

function App() {
  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ticket/:id" element={<Ticket />} />
      </Routes>
    </div>
  );
}

export default App;
