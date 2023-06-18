{
  // 实现一个 EventMitter 类
  

  class EventEmitter {

    listenerMap = new Map()
    
    on = (event, executer) => {
      const eventExecuters = this.listenerMap.get(event) ?? [];
      eventExecuters.push(executer);
      this.listenerMap.set(event, eventExecuters)
    }

    emit = (event, ...args) => {
      const executers = this.listenerMap.get(event) ?? [];

      for (let index = 0; index < executers.length; index++) {
        const executer = executers[index];
        executer(...args);
      }
    }

    once = (event, executer) => {
      const onceExecuter = () => {
        executer();
        this.removeListener(event, executer);
      }

      this.on(event, onceExecuter);
    }

    removeListener = (event, removeExecuter) => {
      if (removeExecuter === undefined) {
        return this.listenerMap.delete(event);
      }

      const executers = this.listenerMap.get(event) ?? [];
      const removeIndex = executers.findIndex((e) => e === removeExecuter)

      if (~removeIndex) {
        this.listenerMap.set(
          event, 
          executers.splice(removeIndex, 1)
        );
      }
    }

    removeAllListeners = () => {
      this.listenerMap.clear();
    }
  }
}