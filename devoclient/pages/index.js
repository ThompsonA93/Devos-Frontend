import { useEffect } from 'react'
import styles from '../styles/Home.module.css'





export default function Home() {

  return (
    <div className='container'>
      <h1 className="title">Home</h1>
      <section className="section">
        <h2 className="subtitle">Welcome back, User</h2>
        <div>Latest Votes</div>
      </section>

      <section className="section">
        <h2 className="subtitle">System Diagnostics</h2>
        <div className="columns">
          <div className="column">
            ETH-Mainnet
            
          </div>
          <div className="column">
            ETH-Goerli

          </div>
          <div className="column">
            ETH-Rinkeby

          </div>
          <div className="column">
            LocalChain

          </div>
        </div>
      </section>
    </div>
  )
}
