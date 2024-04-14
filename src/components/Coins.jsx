import { useState, useEffect } from 'react'
import { baseURL } from './baseURL'
import Loader from './Loader'
import axios from 'axios'
import Header from './Header'
import { PiCurrencyInrBold } from "react-icons/pi";
import { BiDollar } from "react-icons/bi";
import { Link } from 'react-router-dom'
import './Coins.css'

const Coins = () => {

  const [loading, setLoading] = useState(true)
  const [coinsData, setCoinsData] = useState([])
  const [currency, setCurrency] = useState('inr')
  const [search, setSearch] = useState('')

  const currencySymbol = currency === 'inr' ? <PiCurrencyInrBold /> : <BiDollar />

  useEffect(() => {

    const getCoinsData = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/coins/markets?vs_currency=${currency}`)
        // console.log(data);
        setCoinsData(data);
        setLoading(false);
      } catch (error) {
        console.log('Error in Coins:',error);
      }
    }
    getCoinsData()
  }, [currency])
  return (
    <>
      {
        loading ? <Loader /> : <><Header /></>
      }
      <div className="search-bar">
        <input type="text"
          placeholder='Search Coins....'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="Btn">
        <button onClick={() => setCurrency('inr')}>INR</button>
        <button onClick={() => setCurrency("usd")}>USD</button>
      </div>
      {
        coinsData.filter((data) => {
          if (data === '') {
            return data
          } else if (data.name.toLowerCase().includes(search.toLowerCase())) {
            return data
          }
        }).map((coinsData, index) => {
          return (<CoinCard coinsData={coinsData} id={coinsData.id} index={index} currencySymbol={currencySymbol} />)
        })
      }
    </>
  )
}

const CoinCard = ({ coinsData, index, currencySymbol, id }) => {
  const profit = coinsData.price_change_percentage_24h > 0
  return (
    <>
      <Link to={`/coins/${id}`} style={{ color: 'white', textDecoration: 'none' }}>
        <div className="exchange-Card" key={index.id}>
          <div className="image">
            <img style={{ height: '80px' }} src={coinsData.image} alt={coinsData.image} />
          </div>
          <div className="name">{coinsData.name}</div>
          <div className="price">{currencySymbol} {coinsData.current_price}</div>
          <div style={profit ? { color: 'green' } : { color: 'red' }} className="ranking">{profit ? "+" + coinsData.price_change_percentage_24h.toFixed(3) : coinsData.price_change_percentage_24h.toFixed(3)}</div>
        </div>
      </Link>
    </>
  )
}

export default Coins
