import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import './App.css'
import LandingPage from './pages/Landing.jsx'
import Authentication from './pages/Authentication.jsx'
import VideoMeetComponent from './pages/VideoMeet.jsx'

import React from "react"

function App() {

  return (
    <div className="App">
      <Router>

        {/* <AuthProvider> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/:url" element={<VideoMeetComponent />} />
        </Routes>
      {/* </AuthProvider> */}
      </Router>
    </div>
  )
}

export default App
