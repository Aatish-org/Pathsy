import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Navbar";
import Landing from "./Landing";
import TourDetail from "./TourDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tour/:id" element={<TourDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
