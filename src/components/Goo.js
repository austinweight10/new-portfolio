import React from "react"
import { useTrail, animated } from "react-spring"
import styled from "styled-components"
import cursor from "../images/cursor.png"

const HooksMain = styled.div`
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  filter: url("#goo");
  overflow: hidden;
  opacity: 0.6;
  top: 0px;
  cursor: url(${cursor}), auto;

  > svg {
    display: none;
  }

  > div {
    position: absolute;
    will-change: transform;
    border-radius: 50%;
    background: #f0fffe;
    opacity: 0.5;

    &::after {
      content: "";
      position: absolute;
      top: 20px;
      left: 20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  > div:nth-child(1) {
    width: 90px;
    height: 90px;
    &::after {
      top: 30px;
      left: 30px;
      width: 40px;
      height: 40px;
    }
  }

  > div:nth-child(2) {
    width: 120px;
    height: 120px;
    &::after {
      top: 30px;
      left: 30px;
      width: 40px;
      height: 40px;
    }
  }

  > div:nth-child(3) {
    width: 150px;
    height: 150px;
    &::after {
      top: 30px;
      left: 30px;
      width: 50px;
      height: 50px;
    }
  }

  > div:nth-child(4) {
    width: 90px;
    height: 90px;
    &::after {
      top: 30px;
      left: 30px;
      width: 50px;
      height: 50px;
    }
  }

  > div:nth-child(5) {
    width: 70px;
    height: 70px;
    &::after {
      top: 30px;
      left: 30px;
      width: 25px;
      height: 25px;
    }
  }

  > div:nth-child(6) {
    width: 100px;
    height: 100px;
    &::after {
      top: 30px;
      left: 30px;
      width: 25px;
      height: 25px;
    }
  }

  @media only screen and (min-width: 950px) {
    display: block;
    -webkit-animation: fadein 5s;
    -moz-animation: fadein 5s;
    -ms-animation: fadein 5s;
    -o-animation: fadein 5s;
    animation: fadein 5s;
  }

  @keyframes fadein {
    0%,
    70% {
      opacity: 0;
    }
    100% {
      opacity: 0.6;
    }
  }

  @-moz-keyframes fadein {
    0%,
    70% {
      opacity: 0;
    }
    100% {
      opacity: 0.6;
    }
  }

  @-webkit-keyframes fadein {
    0%,
    70% {
      opacity: 0;
    }
    100% {
      opacity: 0.6;
    }
  }

  @-ms-keyframes fadein {
    0%,
    70% {
      opacity: 0;
    }
    100% {
      opacity: 0.6;
    }
  }

  @-o-keyframes fadein {
    0%,
    70% {
      opacity: 0;
    }
    100% {
      opacity: 0.6;
    }
  }
`
const fast = { tension: 1600, friction: 150 }
const slow = { mass: 30, tension: 400, friction: 150 }
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`

export default () => {
  const [trail, set] = useTrail(6, () => ({
    xy: [20, 10],
    config: i => (i === 0 ? fast : slow),
  }))
  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
          <feColorMatrix
            in="blur"
            values="0     0     0     0     0
              0     0.65     0     0     0
              0     0     0.23    0     0
              0     0     0     200     -90"
          />
        </filter>
      </svg>
      <HooksMain onMouseMove={e => set({ xy: [e.clientX, e.clientY] })}>
        {trail.map((props, index) => (
          <animated.div
            key={index}
            style={{ transform: props.xy.interpolate(trans) }}
          />
        ))}
      </HooksMain>
    </>
  )
}
