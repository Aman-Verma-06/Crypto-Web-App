import { Routes, Route } from 'react-router-dom'
import './App.css'
import Exchange from './components/Exchange'
import Coins from './components/Coins'
import CoinDetails from './components/CoinDetails'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Exchange />} />
        <Route path='/coins' element={<Coins />} />
        <Route path='/coins/:id' element={<CoinDetails />} />
      </Routes>
    </>
  )
}

export default App
