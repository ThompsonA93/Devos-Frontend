import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import PollDetails from './PollDetails';

const UserPoll = () => {
  const { idbContractCache, address } = useContext(DataContext);

  useEffect(() => {
    // Just reload on Cache-Change
    console.log(
      'PollUser::Reloading following idbContractCache-Chance',
      idbContractCache
    );
  }, [idbContractCache]);

  return (
    <dl className="m-4">
      {idbContractCache.map((ballot) => {
        console.log('Filtering on creator: ' + ballot.creator);
        return ballot.creator === address ? (
          <PollDetails ballot={ballot} key={ballot.id} />
        ) : (
          <></>
        );
      })}
    </dl>
  );
};

export default UserPoll;
