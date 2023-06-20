import { useCallback, useState } from "react";

function useMap(initializeValue) {
  const [map, setMap] = useState(new Map(initializeValue));

  const actions = {
    set: useCallback((key, value) => {
      setMap(prevMap => {
        const copyMap = new Map(prevMap);
        copyMap.set(key, value);
        return copyMap;
      });
    }, []),

    remove: useCallback(key => {
      setMap(prev => {
        const copy = new Map(prev);
        copy.delete(key);
        return copy;
      });
    }, []),

    clear: () => {
      setMap(() => new Map());
    },
  };

  return [map, actions];
}

export { useMap };
