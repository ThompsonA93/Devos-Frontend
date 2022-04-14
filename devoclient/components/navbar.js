import Link from 'next/link'
import { useEffect, useState } from 'react';

const Navbar = () => {

  

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
      <div class="container">
        <a class="navbar-brand">DeVoS</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExample07">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link href="/"><a class="nav-link active" aria-current="page">Home</a></Link>
            </li>
            <li class="nav-item">
              <Link href="/governance"><a class="nav-link">Governance</a></Link>
            </li>
            <li class="nav-item">
              <Link href="/proposals"><a class="nav-link">Proposals</a></Link>
            </li>
            <li class="nav-item">
              <Link href="/about"><a class="nav-link">About</a></Link>
            </li>
          </ul>
          <div>
            <button onClick={connectWalletHandler} className="button is-primary">Connect Wallet</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;