import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import PollDetails from './PollDetails';

const PollList = () => {
  const { idbContractCache } = useContext(DataContext);

  return (
    <dl className="m-4">
      {idbContractCache.map((ballot) => {
        return ballot.id >= 0 ? (
          <PollDetails ballot={ballot} key={ballot.id} />
        ) : (
          <></>
        );
      })}
    </dl>
  );
};

export default PollList;
