import { useState, useEffect } from 'react'
import Loader from './Loader'
import { baseURL } from './baseURL'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { BiSolidUpArrow, BiSolidDownArrow, BiDollar } from "react-icons/bi";
import './CoinDetails.css'
import { PiCurrencyInrBold } from 'react-icons/pi'
import CoinChart from './CoinChart'

const CoinDetails = () => {

  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [coin, setCoin] = useState([])
  const [currency, setCurrency] = useState('inr')

  const currencySymbol = currency === 'inr' ? <PiCurrencyInrBold /> : <BiDollar />

  const profitSymbol = coin.market_data?.price_change_percentage_24h > 0

  useEffect(() => {
    const getCoinDetails = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/coins/${id}`)
        // console.log(data);
        setCoin(data)
        setLoading(false)
      } catch (error) {
        console.log('Error in CoinDetails:', error);
        setLoading(false)
      }
    }
    getCoinDetails()
  }, [id])

  return (
    <>
      {
        loading ? <Loader /> : <>
          <div className="coin-details" >
            <div className="coin-info">
              <div className="Btn">
                <Link to='/coins'><button>BACK</button></Link>
                <button onClick={() => setCurrency('inr')}>INR</button>
                <button onClick={() => setCurrency("usd")}>USD</button>
              </div>
              <div className="coin-image">
                <img src={coin.image.large} alt={coin.image} />
              </div>
              <div className="coin-name">{coin.name}</div>
              <div className="coin-price">{currencySymbol}{coin.market_data.current_price[currency]}</div>
              <div className="coin-profit">{profitSymbol ? <BiSolidUpArrow color='green' /> : <BiSolidDownArrow color='red' />} {coin.market_data.price_change_percentage_24h.toFixed(3)}%</div>
              <div className="coin-market-rank">#{coin.market_cap_rank}</div>
              <div className="coin-description"><p>{coin.description['en'].split('.')[0]}.</p></div>
            </div>
            <CoinChart currency={currency} />
          </div>
        </>
      }
    </>
  )
}

export default CoinDetails
