import React, { useRef, useState, useEffect, useCallback } from "react"
import { useTransition, animated } from "react-spring"
import styled from "styled-components"
import cursor from "../images/clickToRestart.png"

const IntroSC = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  justify-content: left;
  display: flex;
  align-items: center;
  cursor: url(${cursor}) 30 30, auto;

  padding: 20px;

  .transitions-item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    will-change: transform, opacity, height;

    line-height: 30px;
    font-size: 30px;
    letter-spacing: 3px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  @media only screen and (min-width: 950px) {
    width: auto;
    height: auto;
    margin: 15% 15% 0 0;
    padding: 0;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
`

const Intro = () => {
  const ref = useRef([])
  const [items, set] = useState([])
  const transitions = useTransition(items, null, {
    from: {
      opacity: 0,
      color: "#ff5733",
      "margin-top": "-100%",
      transform: "rotate(30deg)",
    },
    enter: [
      {
        opacity: 1,
        "margin-top": "0",
        transform: "rotate(0deg)",
      },
    ],
    leave: [
      { color: "#8be0b7" },
      {
        opacity: 0,
        "margin-top": "-100%",
        transform: "rotate(-30deg)",
      },
    ],
    update: { color: "#82858c" },
  })

  const reset = useCallback(() => {
    ref.current.map(clearTimeout)
    ref.current = []
    set([])
    ref.current.push(setTimeout(() => set(["Hi,", "I am ", "Austin"]), 3000))
    ref.current.push(setTimeout(() => set([]), 6000))
    ref.current.push(
      setTimeout(
        () => set(["I am the", "Lead Frontend", "Developer at END."]),
        9000
      )
    )
    ref.current.push(setTimeout(() => set([]), 12000))
    ref.current.push(
      setTimeout(
        () => set(["Thanks ", "for visiting! ", "Hope you enjoy!"]),
        15000
      )
    )
  }, [])

  useEffect(() => void reset(), [])

  return (
    <IntroSC>
      <div>
        {transitions.map(({ item, props: { ...rest }, key }) => (
          <animated.div
            className="transitions-item"
            key={key}
            style={rest}
            onClick={reset}
          >
            {item}
          </animated.div>
        ))}
      </div>
    </IntroSC>
  )
}

export default Intro
