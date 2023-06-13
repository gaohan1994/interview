import React, { useEffect, useState } from 'react';

export default function StragePage() {
  const [command, setCommand] = useState({});
  const begin = () => {
    // const ballDiv = document.getElementById('ball');
    // const animate = new Animation(ballDiv);
    // animate.start('top', 500, 1000, 'liner');
    command.execute();
  };

  const undo = () => {
    command.undo();
  };

  useEffect(() => {
    const ballDiv = document.getElementById('ball');
    const animate = new Animation(ballDiv);
    const cmd = new MoveCommand(animate);
    setCommand(cmd);
  }, []);

  return (
    <div>
      <div id="ball" style={{ position: 'absolute', top: '100px' }}>
        ball
      </div>
      <button onClick={begin}>start animation</button>
      <button onClick={undo}>last</button>
    </div>
  );
}

class MoveCommand {
  constructor(receiver, position) {
    this.receiver = receiver;
    this.position = position;
    this.lastPosition = null;
  }

  execute() {
    this.receiver.start('top', 500, 1000, 'liner');
    this.lastPosition = this.receiver.dom.getBoundingClientRect()[
      this.receiver.propertyName
    ];
  }

  undo() {
    this.receiver.start('top', this.lastPosition, 1000, 'liner');
  }
}

const AnimationStrategies = {
  liner: function (t, b, c, d) {
    return (c * t) / d + b;
  },
};
class Animation {
  constructor(dom) {
    this.dom = dom;
    // 开始时间
    this.startTime = 0;
    // 开始地点
    this.startPosition = 0;
    // 结束地点
    this.endPosition = 0;
    // 动画属性
    this.propertyName = null;
    // 缓动算法
    this.easing = null;
    // 持续时间
    this.duration = null;

    this.timer = null;
  }

  /**
   *
   *
   * @author Ghan
   * @param {*} propertyName 要动画的属性
   * @param {*} endPosition 目标位置
   * @param {*} duration 持续时间
   * @param {*} easing 缓动算法
   * @memberof Animation
   */
  start(propertyName, endPosition, duration, easing) {
    this.startTime = +new Date();
    this.propertyName = propertyName;
    this.startPosition = this.dom.getBoundingClientRect()[propertyName];
    this.endPosition = endPosition;
    this.duration = duration;
    this.easing = AnimationStrategies[easing];

    this.timer = setInterval(() => {
      if (this.step() === false) {
        clearInterval(this.timer);
      }
    }, 19);
  }

  // 每一帧执行的操作
  step() {
    const currentTime = +new Date();
    if (currentTime >= this.startTime + this.duration) {
      this.update(this.endPosition);
      return false;
    }

    const nextTargetPosition = this.easing(
      currentTime - this.startTime,
      this.startPosition,
      this.endPosition - this.startPosition,
      this.duration
    );
    this.update(nextTargetPosition);
  }

  /**
   * 更新动画操作
   *
   * @author Ghan
   * @param {*} targetPosition
   * @memberof Animation
   */
  update(targetPosition) {
    this.dom.style[this.propertyName] = targetPosition + 'px';
  }
}
