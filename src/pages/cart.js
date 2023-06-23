import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./page.less";
import { data as cartData } from "./cartdata";
import { throttle } from "../utils/throttle";

const HEADER_HEIGHT = 45;

export default function CartPage() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const [data, setData] = useState([]);
  const [navs, setNavs] = useState([]);
  const [selector, setSelector] = useState("");

  const startRef = useRef();
  const endRef = useRef();

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

  const onAdd = (sectionIndex, foodIndex, event) => {
    setData(prevData => {
      let nextData = prevData;
      nextData[sectionIndex].items[foodIndex].num += 1;
      return [...nextData];
    });
  };

  return (
    <div>
      <header className="header">title</header>
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
        <ul ref={rightRef} className="right" onScroll={throttle(onScroll, 50)}>
          {data.map((sectionList, sectionIndex) => {
            return (
              <li key={sectionList.title}>
                <h3 className="sectionTitle">{sectionList.title}</h3>
                <ul>
                  {sectionList.items.map((item, foodIndex) => {
                    return (
                      <li key={`${sectionList.title}${item.food}`} className="item">
                        <div>{item.food}</div>

                        <div className="bar">
                          <div className={`pop ${item.num > 0 ? "mov" : ""}`}>
                            <span onClick={() => onReduce(sectionIndex, foodIndex)}>-</span>
                            {item.num}
                          </div>
                          <span onClick={event => onAdd(sectionIndex, foodIndex, event)}>+</span>
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
        <span ref={endRef}>cart</span>
      </div>
    </div>
  );
}
