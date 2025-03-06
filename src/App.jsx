import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ProjectContextProvider from './context/ProjectContext'
import Project from './pages/Project'

function App() {

  return (
    <ProjectContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/project' element={<Project/>}/>
        </Routes>
      </BrowserRouter>
    </ProjectContextProvider>
  )
}

export default App
