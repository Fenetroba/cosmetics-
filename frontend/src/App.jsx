import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './all users/Header'
import Herosection from './all users/herosection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
     <Herosection/>
        
    </>
  )
}

export default App
