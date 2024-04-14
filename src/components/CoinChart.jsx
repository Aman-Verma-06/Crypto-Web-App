import { useState, useEffect } from 'react'
import { baseURL } from './baseURL'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Loader from './Loader';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const CoinChart = ({ currency }) => {

    const { id } = useParams()

    const [chartData, setChartData] = useState([])
    const [days, setDays] = useState(1)

    useEffect(() => {
        const coinChartData = async () => {
            try {
                const { data } = await axios.get(`${baseURL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
                setChartData(data.prices)
            } catch (error) {
                console.log('Error in CoinChart', error);
            }
        }
        coinChartData()
    }, [currency, id, days])

    const myData = {
        labels: chartData.map((val) => {
            const date = new Date(val[0])
            const time = date.getHours() > 12 ? `${date.getHours() - 12} : ${date.getMinutes()} PM` : `${date.getHours()} : ${date.getMinutes()} AM`
            return days === 1 ? time : date.toLocaleDateString()
        }),
        datasets: [
            {
                labels: ` Price in Past Days ${days} in ${currency} `,
                data: chartData.map((val) => val[1]),
                borderColor: 'orange',
                borderWidth: '3'
            }
        ]
    }

    return (
        <>
            {
                chartData.length === 0 ? (<Loader />) : (<>
                    <Line data={myData} options={{ elements: { point: { radius: 1 } } }} style={{ marginTop: '2rem', width: '60rem', cursor: 'pointer' }} />
                    <div className="Btn" style={{ position: 'absolute', top: '95%', left: '45%' }}>
                        <button onClick={() => setDays(1)}>1D</button>
                        <button onClick={() => setDays(30)}>1M</button>
                        <button onClick={() => setDays(365)}>1Y</button>
                    </div>
                </>)
            }
        </>
    )
}

export default CoinChart
