import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { baseURL } from './baseURL'
import Loader from './Loader'
import './Exchange.css'

const Exchange = () => {

    const [loading, setLoading] = useState(true)
    const [exchangeData, setExchangeData] = useState([])

    useEffect(() => {

        const getExchangeData = async () => {
            try {
                const { data } = await axios.get(`${baseURL}/exchanges`)
                // console.log(data);
                setExchangeData(data);
                setLoading(false);
            } catch (error) {
                console.log('Error in Exchange:',error);
            }
        }
        getExchangeData()
    }, [])

    return (
        <>
            {
                loading ? <Loader /> : <Header />
            }
            {
                exchangeData.map((data, index) => {
                    return (
                        <>
                            <div className="exchange-Card" key={index.id}>
                                <div className="image">
                                    <img style={{ height: '80px' }} src={data.image} alt={data.image} />
                                </div>
                                <div className="name">{data.name}</div>
                                <div className="price">{data.trade_volume_24h_btc.toFixed(0)}</div>
                                <div className="ranking">{data.trust_score_rank}</div>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default Exchange
