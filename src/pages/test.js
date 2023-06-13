import React, { useEffect } from 'react';

import Comp1 from '../component/Comp1';
import Comp2 from '../component/Comp2';
import Comp3 from '../component/Comp3';
import Comp4 from '../component/Comp4';
import repeat from './request';
import './page.less';
import EventDom from '../component/evnetdom';

export function Test() {
  useEffect(() => {}, []);

  const fetchRej = () => {
    const repeatRequest = repeat();
    repeatRequest('http://101.132.24.127:9090/api/getimmortal')
      .then((result) => {
        console.log('请求结果', result);
      })
      .catch((error) => {
        console.log('请求超次数', error);
      });
  };

  return (
    <div className="test">
      Test
      <button onClick={fetchRej}>fetch</button>
      <EventDom />
      <ul>
        <Comp1 />
        <Comp2 />
        <Comp3 />
        <Comp4 />
      </ul>
    </div>
  );
}

export default Test;
