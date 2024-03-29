import './Footer.module.css';

const Footer = () => {
  return (
    <footer className="box">
      <div className="columns">
        <div className="column is-one-third">
          <section className="m-5">
            <p>Build 0.10</p>
            <p>Dev. 2021-2023</p>
          </section>
        </div>
        <div className="column is-one-third">
          <section className="m-5">
            <h3>Resources</h3>
            <dl>
              <dt>
                <a
                  href="https://github.com/ThompsonA93/DevoClient"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  DeVoS Client{' '}
                </a>
              </dt>
              <dt>
                <a
                  href="https://github.com/ThompsonA93/DevoServ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  DeVoS Server{' '}
                </a>
              </dt>
              <dt>
                <a
                  href="https://github.com/ThompsonA93/DevoChain"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  DeVoS Blockchain{' '}
                </a>
              </dt>
            </dl>
          </section>
        </div>
        <div className="column is-one-third">
          <section className="m-5">
            <h3>Links</h3>
            <dl>
              <dt>
                <a
                  href="https://nextjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  NextJS{' '}
                </a>
              </dt>
              <dt>
                <a
                  href="https://hardhat.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  HardHat{' '}
                </a>
              </dt>
              <dt>
                <a
                  href="https://ethereum.org/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  Ethereum{' '}
                </a>
              </dt>
            </dl>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
