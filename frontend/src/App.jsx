import React from 'react'
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  </Router>
)
const App = () => {
  return (
    <div>
      {routes}
      {/* Add any other routes here */}
    </div>
  )
}

export default App