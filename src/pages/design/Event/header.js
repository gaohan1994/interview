import React, { useEffect, useState } from 'react';
import { eventEmiiter } from '../event';

export default function EventHeader() {
  const [user, setUser] = useState({});

  useEffect(() => {
    eventEmiiter.on('login', onLoginHandle);

    return () => {
      eventEmiiter.off('login', onLoginHandle);
    };
  }, []);

  const onLoginHandle = (data) => {
    console.log('登录data', data);
    setUser(data);
  };

  return (
    <div>
      EventHeader
      {user.name ? (
        <div>
          姓名：{user.name}
          年龄：{user.age}
          性别：{user.sex}
        </div>
      ) : (
        <div>暂未登录</div>
      )}
    </div>
  );
}
