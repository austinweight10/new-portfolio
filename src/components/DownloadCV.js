import React, { useState } from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"
import CV from "../images/Austin-Weight-CV.pdf"
import useWindowSize from "@rooks/use-window-size"

// text is getting blurry when zoomed
// make sure doesn't zoom to much on larger screens add breakpoint

const DownloadCVSC = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  z-index: 100;

  > div {
    width: 50%;
    height: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: linear-gradient(135deg, #ffb8a8 0%, #ff5733 100%);
    border-radius: 5px;
    margin: auto 0 0 auto;
    -webkit-transition: all 200ms linear;
    -ms-transition: all 200ms linear;
    transition: all 200ms linear;
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
    &:hover {
      transform: scale(1.1);
      color: white;
      background: linear-gradient(195deg, #ffb8a8 0%, #ff5733 100%);
      box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
    }
    h4 {
      &:hover {
        color: #82858c;
      }
    }
  }

  > div > div {
    will-change: opacity;
  }

  @media only screen and (min-width: 950px) {
    width: auto;
    height: auto;
    margin: 15% 0 0 15%;
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 2;
  }
`

const DownloadCVMobileSC = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  z-index: 100;
  padding: 40px 0;

  height: 60px;

  background: linear-gradient(195deg, #ffb8a8 0%, #ff5733 100%);
  border-radius: 5px;

  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 7;
  grid-row-end: 7;

  h4 {
    width: 100%;
    text-align: center;
  }
`

const calc = (x, y) => [
  -(y - window.innerHeight / 3) / 25,
  (x - window.innerWidth / 1.4) / 25,
  3,
]

const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const DownloadCV = ({ mounted }) => {
  const [state, toggle] = useState(true)
  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
  })
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }))
  const { innerWidth } = useWindowSize()

  if (mounted) {
    if (innerWidth < 950) {
      return (
        <DownloadCVMobileSC
          onClick={() => {
            setTimeout(() => {
              window.open(CV)
            }, 700)
            toggle(!state)
          }}
        >
          <h4>Download CV</h4>
        </DownloadCVMobileSC>
      )
    }

    return (
      <DownloadCVSC>
        <animated.div
          class="card"
          onMouseMove={({ clientX: x, clientY: y }) => {
            set({ xys: calc(x, y) })
          }}
          onMouseLeave={() => set({ xys: [0, 1, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}
        >
          <div
            onClick={() => {
              setTimeout(() => {
                window.open(CV)
              }, 700)
              toggle(!state)
            }}
          >
            <animated.div
              style={{
                opacity: x.interpolate({ range: [0, 1], output: [0.7, 1] }),
                transform: x
                  .interpolate({
                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                    output: [1, 0.97, 1, 1.5, 0.9, 1.1, 1.03, 1],
                  })
                  .interpolate(x => `scale(${x})`),
              }}
            >
              <h4>Download CV</h4>
            </animated.div>
          </div>
        </animated.div>
      </DownloadCVSC>
    )
  }
  return null
}

export default DownloadCV
