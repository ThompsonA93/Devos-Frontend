const Footer = () => {
  return (
    <footer className="box">
      <div className="columns">
        <div className="column is-one-third">
          <section className="m-5">
            <p>&copy; 2021-2022</p>
          </section>
        </div>

        <div className="column is-one-third">
          <section className="m-5">
            <h3>Resources</h3>
            <dl>
              <dt><a href="https://github.com/ThompsonA93/DevoClient" target="_blank"> DeVoS Client </a></dt>
              <dt><a href="https://github.com/ThompsonA93/DevoServ" target="_blank"> DeVoS Server </a></dt>
              <dt><a href="https://github.com/ThompsonA93/DevoChain" target="_blank"> DeVoS Blockchain </a></dt>
            </dl>
          </section>
        </div>

        <div className="column is-one-third">
          <section className="m-5">
            <h3>Links</h3>
            <dl>
              <dt><a href="https://nextjs.org/" target="_blank"> NextJS </a></dt>
              <dt><a href="https://hardhat.org/" target="_blank"> HardHat </a></dt>
              <dt><a href="https://ethereum.org/en/" target="_blank"> Ethereum </a></dt>
            </dl>
          </section>
        </div>
      </div>
    </footer>

  )
}

export default Footer