import Link from "next/link";

export interface IHeader extends React.ComponentPropsWithoutRef<"header"> {}

const Header: React.FC<IHeader> = ({ className, ...headerProps }) => {
  return (
    <header
      {...headerProps}
      className={`w-full flex flex-row justify-between bg-gray-900 text-gray-200 ${className}`}
    >
      <div className="space-x-5 m-5">
        <a>DEVOS</a>
        <Link href="/">
          <a className="hover:underline">Home</a>
        </Link>
        <Link href="/governance">
          <a className="hover:underline">Governance</a>
        </Link>
        <Link href="/proposals">
          <a className="hover:underline hidden sm:inline">Proposals</a>
        </Link>
        <Link href="/help">
          <a className="hover:underline hidden sm:inline">Help</a>
        </Link>
      </div>
      <div className="space-x-5 m-5">
        <button className="border-1 p-2 px-4 sm:px-6 bg-blue-500 rounded text-white">
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

export default Header;
