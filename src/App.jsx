import React from "react"
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import './App.css'
import LandingPage from './pages/Landing.jsx'
import Authentication from './pages/Authentication.jsx'
import { AuthProvider } from "./contexts/authContext.jsx";
import VideoMeetComponent from "./pages/VideoMeet.jsx"



function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={< Authentication />} /> 
          <Route path ="video-meet" element={<VideoMeetComponent />} />
          <Route path="/:url" element={<VideoMeetComponent />} />
          
        </Routes>
        </AuthProvider>
      
      </Router>
      
    </div>
  )
}

export default App;

