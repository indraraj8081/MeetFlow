import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import './App.css'
import LandingPage from './pages/Landing.jsx'

import React from "react"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
        </Routes>
      </Router>
    </>
  )
}

export default App
