import { useEffect, useState } from "react";

function RaceCondition({ userId }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let didCanceled = false;

    setLoading(true);

    fetch(`/user/${userid}`).then(data => {
      if (!didCanceled) {
        setUser(data);
      }
    });

    return () => {
      didCanceled = true;
    };
  }, [userId]);

  return <div>{loading ? "loading" : user.name}</div>;
}
