import { Cart } from "./components/Cart";
import { useMap } from "./hook/useMap";
import { useRef } from "react";
import { AnimateBall } from "./components/AnimateBall";
import { createAnimateBallContext } from "./components/createAnimateBallContext";
import "./App.css";

function createAnimateBallId() {
  return Math.random() * Date.now() + Math.random();
}

function App() {
  const cartRef = useRef();
  const [animateBallMap, actions] = useMap();
  const { set, remove } = actions;

  const createAnimateBall = event => {
    const id = createAnimateBallId();
    const animateBallContext = createAnimateBallContext(event, cartRef.current);
    set(id, {
      id,
      context: animateBallContext,
      remove: () => remove(id),
    });
  };

  return (
    <>
      <div className="card">
        <button onClick={createAnimateBall}>create animate ball</button>
      </div>
      {Array.from(animateBallMap).map(([id, item]) => (
        <AnimateBall key={id} {...item} />
      ))}
      <div className="cart-box" ref={cartRef}>
        <Cart />
      </div>
    </>
  );
}

export default App;
