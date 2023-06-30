import Home from './pages/Home.js';
import Count from './pages/Count.js';
import { Route, Router, Routes } from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/vivi" element={<Count/>}/>
      </Routes>
  );
}

export default App;
