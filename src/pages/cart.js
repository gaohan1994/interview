import React, { useState, useEffect, useRef } from 'react';
import './page.less';
import { navs, data as cartData } from './cartdata';
import useBall from './ball';

const cartItemHeight = 50;

function CartItem() {
  return <div style={{ height: cartItemHeight }}></div>;
}

export default function CartPage() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [selector, setSelector] = useState('');
  const [data, setData] = useState(cartData);

  const startRef = useRef();
  const endRef = useRef();

  const ball1 = useBall(startRef, endRef);

  useEffect(() => {
    if (selector) {
      window.location.hash = selector;
      const selectedIndex = navs.indexOf(selector);
      leftRef.current.scrollTop =
        (selectedIndex > 7 ? selectedIndex - 7 : 0) * 50;
    }
  }, [selector]);

  const setSection = (sectionId) => {
    setSelector(sectionId);
  };

  const toSection = (event) => {
    const targetElement = event.target;
    const targetId = targetElement.getAttribute('id');

    setSection(targetId);
  };

  const onScroll = () => {
    const titles = document.getElementsByClassName('sectionTitle');
    for (let i = 0; i < titles.length; i++) {
      const style = titles[i].getBoundingClientRect();

      if (style.top === 107) {
        setSection(titles[i].innerHTML);
      }
    }
  };

  const onReduce = (sectionIndex, foodIndex) => {
    setData((prevData) => {
      let nextData = prevData;
      nextData[sectionIndex].items[foodIndex].num =
        nextData[sectionIndex].items[foodIndex].num > 0
          ? nextData[sectionIndex].items[foodIndex].num - 1
          : 0;
      return [...nextData];
    });
  };

  const onAdd = (sectionIndex, foodIndex, event) => {
    setData((prevData) => {
      let nextData = prevData;
      nextData[sectionIndex].items[foodIndex].num += 1;
      return [...nextData];
    });

    ball1.running(1);
  };

  return (
    <div>
      <header className="header">title</header>
      <div className="notice" ref={startRef}>
        this is notice
      </div>
      <div className="goods">
        <ul className="left" onClick={toSection} ref={leftRef}>
          {navs.map((nav) => (
            <li key={nav} id={nav} className={nav === selector ? 'active' : ''}>
              {nav}
            </li>
          ))}
        </ul>
        <ul ref={rightRef} className="right" onScroll={onScroll}>
          {data.map((sectionList, sectionIndex) => {
            return (
              <li key={sectionList.title}>
                <h3 className="sectionTitle">{sectionList.title}</h3>
                <ul>
                  {sectionList.items.map((item, foodIndex) => {
                    return (
                      <li
                        key={`${sectionList.title}${item.food}`}
                        className="item"
                      >
                        <div>{item.food}</div>

                        <div className="bar">
                          <div className={`pop ${item.num > 0 ? 'mov' : ''}`}>
                            <span
                              onClick={() => onReduce(sectionIndex, foodIndex)}
                            >
                              -
                            </span>
                            {item.num}
                          </div>
                          <span
                            onClick={(event) =>
                              onAdd(sectionIndex, foodIndex, event)
                            }
                          >
                            +
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="footer">
        <span ref={endRef}>footer</span>
      </div>
    </div>
  );
}
