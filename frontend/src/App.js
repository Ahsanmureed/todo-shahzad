import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home';
import ReadUser from './ReadUser';
import UpdateUser from './UpdateUser';


const App = () => {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/readuser/:id" element={<ReadUser/>} />
        <Route path="/updateuser/:id" element={<UpdateUser/>} />
      </Routes>
      </Router>
      </div>
  )
}

export default App;
