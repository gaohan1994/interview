import { useMap } from "./hook/useMap";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { data as cartData } from "./cartData";
import { AnimateBall } from "./components/AnimateBall";
import { createAnimateBallContext } from "./components/createAnimateBallContext";
import "./components/cart.css";

function createAnimateBallId() {
  return Math.random() * Date.now() + Math.random();
}

function App() {
  const [animateBallMap, actions] = useMap();
  const { set, remove } = actions;

  const [data, setData] = useState([]);
  const [navs, setNavs] = useState([]);
  const [selector, setSelector] = useState("");

  const startRef = useRef();
  const cartRef = useRef();
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const sectionRef = useRef();

  useEffect(() => {
    const _cartData = cartData;
    setData(_cartData);
    const _navs = cartData.map(item => item.title);
    setNavs(_navs);
  }, []);

  useLayoutEffect(() => {
    if (navs.length > 0) {
      let hash = window.location.hash;
      hash = hash.replace("#", "");
      hash = hash.replace("/", "");

      if (navs.includes(hash)) {
        const nodeList = rightRef.current
          .querySelector(`#right-${hash}`)
          ?.querySelector(`#right-${hash}-list`);
        nodeList.scrollIntoView({});
      }
    }
  }, [navs]);

  useEffect(() => {
    if (selector) {
      window.location.hash = selector;
    }
  }, [selector]);

  const setSection = sectionId => {
    setSelector(sectionId);
  };

  const toSection = event => {
    const targetElement = event.target;
    const targetId = targetElement.getAttribute("id");
    sectionRef.current = targetId;
    setSection(targetId);
    scrollToSection();
  };

  const scrollToSection = () => {
    const section = sectionRef.current;

    if (navs.includes(section)) {
      const nodeList = rightRef.current
        .querySelector(`#right-${section}`)
        ?.querySelector(`#right-${section}-list`);
      nodeList.scrollIntoView();
    }
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
            <li key={sectionList.title} id={`right-${sectionList.title}`}>
              <h3 className="sectionTitle">{sectionList.title}</h3>
              <ul id={`right-${sectionList.title}-list`}>
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
