
import './App.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"

function App() {
  const navigate= useNavigate()
  return (
    <div className="App">
      <h1> hello dear</h1>
      <Button variant="outline-secondary" onClick={ ()=>navigate("create")}>Next</Button>
    </div>
  );
}

export default App;
