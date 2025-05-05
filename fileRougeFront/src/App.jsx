import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import PostCard from './components/PostCard'
import Feed from './components/fyp/PostCard/feed'
import Nav from './components/nav'
import CreatePostForm from './components/forms/PostingForm'
import CreatePostBar from './components/buttons/showPostingForm'
// import Footer from './components/footer'
// import ProgramCard from './components/ProgramCard'
import Home from './components/pages/Home'
import './App.css'
import SignUpFormClient from './components/forms/SignUpClient'
// import Home from './components/pages/Home'
import LoginForm from './components/forms/LoginForm'
import Fyp from './components/fyp/fyp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Fyp/>
    </>





  )
}

export default App
