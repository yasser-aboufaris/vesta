import { useState } from 'react'
import PostModal from './components/fyp/postingForm'
import Feed from './components/fyp/PostCard/feed'
import Nav from './components/nav'
import CreatePostForm from './components/forms/PostingForm'
import CreatePostBar from './components/buttons/showPostingForm'

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

     {/* <Fyp/> */}
     <PostModal/>
    </>





  )
}

export default App
