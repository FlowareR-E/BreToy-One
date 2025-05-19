import { useState } from 'react'
import { InventoryMain } from './pages/InventoryMain'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <InventoryMain/>
    </>
  )
}

export default App
