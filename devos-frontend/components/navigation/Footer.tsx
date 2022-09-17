export interface IFooter extends React.ComponentPropsWithoutRef<"footer"> {}

const Footer: React.FC<IFooter> = ({ className, ...footerProps }) => {
  return (
    <footer
      {...footerProps}
      className={`w-full p-5 bg-slate-100 text-slate-500 grid grid-cols-3 gap-3${className}`}
    >
      <div>
        <section>
          <p>Dev.: 2021-2022</p>
        </section>
      </div>
      <div>
        <section>
          <h3>Resources</h3>
          <dl>
            <dt>
              <a
                href="https://github.com/ThompsonA93/Devos-Frontend"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Client{" "}
              </a>
            </dt>
            <dt>
              <a
                href="https://github.com/ThompsonA93/Devos-DBMS"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Server{" "}
              </a>
            </dt>
            <dt>
              <a
                href="https://github.com/ThompsonA93/Devos-Contracts"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Blockchain{" "}
              </a>
            </dt>
          </dl>
        </section>
      </div>

      <div>
        <section>
          <h3>Links</h3>
          <dl>
            <dt>
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                NextJS{" "}
              </a>
            </dt>
            <dt>
              <a
                href="https://hardhat.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                HardHat{" "}
              </a>
            </dt>
            <dt>
              <a
                href="https://ethereum.org/en/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Ethereum{" "}
              </a>
            </dt>
          </dl>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
