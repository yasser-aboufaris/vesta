import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PostCard from './components/PostCard'
import Feed from './components/feed'
import Nav from './components/nav'
import CreatePostBar from './components/buttons/showPostingForm'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
<div style={{ background: 'black' ,
            width: '100%',
            border: '30px solid black' }}>
  <CreatePostBar/>
  <Nav />
  <Feed />
</div>

  )
}

export default App
