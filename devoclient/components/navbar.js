import { useState } from 'react';
import Link from 'next/link'
import connectWalletHandler from '../w3/WalletHandler';


const Navbar = () => {
  return (
    <nav className='navbar m-4'>
      <div className='container'>
        <div className='navbar-brand mx-5'>
          <h1>DeVoS</h1>
        </div>
        <div className='navbar-start'>
          <Link href="/"><a className="navbar-item">
              Home
          </a></Link>

          <Link href="/governance"><a className="navbar-item">
              Governance
          </a></Link>

          <Link href="/proposals"><a className="navbar-item">
              Proposals
          </a></Link>

          <Link href="/help"><a className="navbar-item">
              Help
          </a></Link>

        </div>
        <div className='navbar-end mx-5'>
          <button onClick={connectWalletHandler} className='button is-link'>Connect Wallet</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;