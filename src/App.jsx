import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import UpdateProfile from './pages/UpdateProfile'
import NavBar from './components/NavBar'
import Blog from './pages/Blog'
import CreateBlog from './pages/CreateBlog'
import UpdateBlog from './pages/updateBlog'

function App() {

  return (
    <BrowserRouter>
    <NavBar />
  <Routes>
    <Route path='/register' element={<Signup />}/>
    <Route path='/login' element={<SignIn />}/>
    <Route path='/profile' element={<Profile />}/>
    <Route path='/update' element={<UpdateProfile />}/>
    <Route path='/' element={<Blog />}/>
    <Route path='/create' element={<CreateBlog />}/>
    <Route path='/updateblg/:id' element={<UpdateBlog />}/>
  </Routes>
    </BrowserRouter>
  )
}

export default App
