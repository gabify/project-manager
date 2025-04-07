import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ProjectContextProvider from './context/ProjectContext'
import Project from './pages/Project'
import Pomodoro from './pages/Pomodoro'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {

  return (
    <ProjectContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/project' element={<Project/>}/>
          <Route path='/task' element={<Pomodoro />}/>
        </Routes>
      </BrowserRouter>
    </ProjectContextProvider>
  )
}

export default App
