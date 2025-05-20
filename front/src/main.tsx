import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { InventoryMain } from './pages/InventoryMain.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InventoryMain />
  </StrictMode>,
)
