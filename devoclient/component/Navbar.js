import { useContext, useState } from 'react';
import Link from 'next/link'
import { W3Context } from '../context/W3Context';


const Navbar = () => {
  const { address, connect } = useContext(W3Context);

  return (
    <nav className='navbar is-dark'>
      <div className='navbar-brand'>
        <a className='navbar-item is-size-1 mr-3'>DeVoS</a>
      </div>
      <div className='navbar-menu'>
        <Link href="/">
          <a className="navbar-item mx-1 has-text-white-bis">Home</a>
        </Link>
        <Link href="/governance">
          <a className="navbar-item mx-1 has-text-white-bis	">Governance</a>
        </Link>
        <Link href="/proposals">
          <a className="navbar-item mx-1 has-text-white-bis	">Proposals</a>
        </Link>
        <Link href="/help">
          <a className="navbar-item mx-1 has-text-white-bis	">Help</a>
        </Link>
      </div>
      <div className='navbar-end'>
        <div className='navbar-item'>
          <p className='control'>
            <a href={`https://rinkeby.etherscan.io/address/${address}`} target="_blank" className='button is-white'>{address}</a> 
          </p>
        </div>
        <div className='navbar-item'>
          <p className='control'>
            <a className='button is-white' onClick={connect}>Connect Wallet</a>
          </p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;



