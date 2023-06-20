import { useEffect, useRef, useState } from "react";
import reactLogo from "../assets/react.svg";
import "./animate-ball.css";

export function AnimateBall(props) {
  const { context, remove } = props;
  const { startX, startY, targetX, targetY, speedX, speedY } = context;

  const animateRef = useRef();
  const loopRef = useRef(0);

  const [x, setX] = useState(startX);
  const [y, setY] = useState(startY);

  const animate = () => {
    setX(prevX => prevX + speedX);
    setY(prevY => prevY + speedY * ++loopRef.current);
    animateRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animateRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animateRef.current);
  }, []);

  useEffect(() => {
    if (speedX > 0) {
      if (x >= targetX || y >= targetY) {
        remove();
      }
    } else {
      if (x <= targetX || y >= targetY) {
        remove();
      }
    }
  }, [x, y, targetX, targetY, speedX, remove]);

  return (
    <img
      src={reactLogo}
      style={{ position: "absolute", left: x, top: y }}
      className="logo react ball"
      alt="React logo"
    />
  );
}
