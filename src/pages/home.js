import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import useFilter from '../hook/hook';
import SetTime from './settime';
import { ReduxPage } from './reduxpage';
// import Settimefunc from './settimefunc';
// import Upload from './upload';
// import EventDom from '../component/evnetdom';

export function Home() {
  const {
    sort,
    page,
    setPage,
    toogleSort,
    word,
    setWord,
    fetchData,
  } = useFilter('http://101.132.24.127:9090/api/getimmortal');

  useEffect(() => {
    fetchData().then((res) => {
      console.log('all res', res);
    });

    return () => {
      console.log('hello return');
    };
  }, [fetchData]);

  useEffect(() => {
    console.log('{}.toString()', {}.toString());
    console.log('[].toString()', [].toString());

    console.log(1 + true);

    console.log(11 + '2' - 1);

    console.log('111' > 1);
    // console.log(Object.valueOf.call(''));
    // console.log('[] + {}', [] + {});
    // console.log('{} + []', {} + []);
  });

  return (
    <div>
      <ReduxPage />
      {/* <SetTime /> */}
      {/* <Settimefunc /> */}
      {/* <button onClick={() => setPage(page + 1)}>page+1</button> */}
      {/* <button onClick={() => toogleSort()}>sort</button> */}
      {/* <button
        onClick={() => {
          setPage((prevPage) => prevPage + 1);
          toogleSort();
          setPage((prevPage) => prevPage + 1);
          setWord('name=gaohan');
        }}
      >
        both
      </button> */}

      {/* <EventDom /> */}
      {/* <Upload /> */}
    </div>
  );
}

export default Home;
