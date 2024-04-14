import { ProgressBar } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ProgressBar
        visible={true}
        height="200"
        width="200"
        color="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default Loader
