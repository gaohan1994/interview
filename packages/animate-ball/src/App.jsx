import { useMap } from "./hook/useMap";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { data as cartData } from "./cartData";
import { AnimateBall } from "./components/AnimateBall";
import { createAnimateBallContext } from "./components/createAnimateBallContext";
import "./components/cart.css";

const HEADER_HEIGHT = 45;

function createAnimateBallId() {
  return Math.random() * Date.now() + Math.random();
}

function App() {
  const [animateBallMap, actions] = useMap();
  const { set, remove } = actions;

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const [data, setData] = useState([]);
  const [navs, setNavs] = useState([]);
  const [selector, setSelector] = useState("");

  const startRef = useRef();
  const cartRef = useRef();

  useLayoutEffect(() => {
    const _cartData = cartData;
    setData(_cartData);
    const _navs = cartData.map(item => item.title);
    setNavs(_navs);

    let hash = window.location.hash;
    hash = hash.replace("#", "");
    hash = hash.replace("/", "");

    if (_navs.includes(hash)) {
      setSection(hash);

      let startIndex = 0;
      let scrollDistance = 0;

      while (_navs[startIndex] !== hash) {
        const currentSection = _cartData[startIndex];
        scrollDistance += currentSection.items.length * 81;
        scrollDistance += HEADER_HEIGHT;
        startIndex++;
      }

      requestAnimationFrame(() => rightRef.current?.scroll({ top: scrollDistance }));
    }
  }, []);

  useEffect(() => {
    if (selector) {
      window.location.hash = selector;
      const selectedIndex = navs.indexOf(selector);
      leftRef.current.scrollTop = (selectedIndex > 7 ? selectedIndex - 7 : 0) * 50;
    }
  }, [selector]);

  const setSection = sectionId => {
    setSelector(sectionId);
  };

  const toSection = event => {
    const targetElement = event.target;
    const targetId = targetElement.getAttribute("id");

    setSection(targetId);
  };

  const onScroll = () => {
    const titles = document.getElementsByClassName("sectionTitle");
    for (let i = 0; i < titles.length; i++) {
      const style = titles[i].getBoundingClientRect();

      if (style.top === 107) {
        setSection(titles[i].innerHTML);
      }
    }
  };

  const onReduce = (sectionIndex, foodIndex) => {
    setData(prevData => {
      let nextData = prevData;
      nextData[sectionIndex].items[foodIndex].num =
        nextData[sectionIndex].items[foodIndex].num > 0
          ? nextData[sectionIndex].items[foodIndex].num - 1
          : 0;
      return [...nextData];
    });
  };

  const onAdd = (event, sectionIndex, foodIndex) => {
    setData(prevData => {
      let nextData = prevData;
      nextData[sectionIndex].items[foodIndex].num += 1;
      return [...nextData];
    });

    createAnimateBall(event);
  };

  const createAnimateBall = event => {
    const id = createAnimateBallId();
    set(id, {
      id,
      context: createAnimateBallContext(event, cartRef.current),
      remove: () => remove(id),
    });
  };

  const animatedBalls = useMemo(() => Array.from(animateBallMap), [animateBallMap]);

  return (
    <div>
      <header className="header">Layout Demo</header>
      <div className="notice" ref={startRef}>
        this is notice
      </div>
      <div className="goods">
        <ul className="left" onClick={toSection} ref={leftRef}>
          {navs.map(nav => (
            <li key={nav} id={nav} className={nav === selector ? "active" : ""}>
              {nav}
            </li>
          ))}
        </ul>
        <ul ref={rightRef} className="right" onScroll={onScroll}>
          {data.map((sectionList, sectionIndex) => (
            <li key={sectionList.title}>
              <h3 className="sectionTitle">{sectionList.title}</h3>
              <ul>
                {sectionList.items.map((item, foodIndex) => (
                  <li key={`${sectionList.title}${item.food}`} className="item">
                    <div>{item.food}</div>

                    <div className="bar">
                      <div className={`pop ${item.num > 0 ? "mov" : ""}`}>
                        <span
                          style={{ padding: 5 }}
                          onClick={() => onReduce(sectionIndex, foodIndex)}
                        >
                          -
                        </span>
                        {item.num}
                      </div>
                      <span
                        style={{ padding: 5 }}
                        onClick={event => onAdd(event, sectionIndex, foodIndex)}
                      >
                        +
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {animatedBalls.map(([id, item]) => (
        <AnimateBall key={id} {...item} />
      ))}
      <div className="footer" ref={cartRef}>
        <span>cart</span>
      </div>
    </div>
  );
}

export default App;
