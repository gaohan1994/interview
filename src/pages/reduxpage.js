import React, {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return [rect, ref];
}

let ReduxPage = () => {
  const [data, setData] = useState([]);
  const [rect, proCardRef] = useClientRect();

  useEffect(() => {
    setTimeout(() => {
      setData(['111', 222, '333']);
    }, 1000);
  }, []);
  return (
    <div>
      {data.length > 0 && <h1>has data</h1>}
      <ProCard ref={proCardRef} data={data} />
    </div>
  );
};

const ProCard = React.forwardRef((props, ref) => {
  const { data } = props;
  return (
    <div ref={ref}>
      ProCard
      {data &&
        data.map((item) => {
          return <div key={item}>{item}</div>;
        })}
    </div>
  );
});

// ReduxPage = connect()(ReduxPage);

export { ReduxPage };
