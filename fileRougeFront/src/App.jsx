import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import PostCard from './components/PostCard'
import Feed from './components/feed'
import Nav from './components/nav'
// import CreatePostBar from './components/buttons/showPostingForm'
// import Footer from './components/footer'
// import ProgramCard from './components/ProgramCard'
import './App.css'
import SignUpFormClient from './components/forms/SignUpClient'
// import Home from './components/pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
<div className="bg-gray-900 text-gray-300 min-h-screen">
  {/* <CreatePostBar/>
  <Nav />
  <Feed />
  <Footer /> */}
  {/* <ProgramCard/>
  <Footer /> */}
  {/* <SignUpFormClient/> */}
  <Nav/>
  <Feed />
</div>


  )
}

export default App
