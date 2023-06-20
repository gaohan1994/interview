export function createAnimateBallContext(startEvent, targetEvent) {
  const { clientX, clientY } = startEvent;
  const { offsetLeft, offsetTop } = targetEvent;
  const time = 200;
  return {
    startX: clientX,
    startY: clientY,
    targetX: offsetLeft,
    targetY: offsetTop,
    speedX: (offsetLeft - clientX) / time,
    speedY: (2 * (offsetTop - clientY)) / (time * time),
    time,
  };
}
