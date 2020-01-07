import React, { useRef, useEffect, useState, memo } from "react"
import clamp from "lodash-es/clamp"
import { useSprings, animated } from "react-spring"
import { useGesture } from "react-use-gesture"
import styled from "styled-components"
import ProjectDictonary from "../info/projectDictonary"
import adCalculator from "../images/coverImages/adCalculator.jpg"
import ads from "../images/coverImages/ads.jpg"
import END from "../images/coverImages/END.jpg"
import Headless from "../images/coverImages/Headless.jpg"
import matchBetting from "../images/coverImages/matchBetting.jpg"
import homeFromHome from "../images/coverImages/homeFromHome.png"
import yawp from "../images/coverImages/yawp.jpg"
import zorokovick from "../images/coverImages/zorokovick.png"
import useWindowSize from "@rooks/use-window-size"
import cursor from "../images/dragToSwap.png"
import { animateScroll as scroll } from "react-scroll"

// images are cut off at larger sizes
// and at smaller sizes swipe is weird - check on device

// todo before go live
// webgl takeover

const WorkSC = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  cursor: url(${cursor}) 30 30, auto;
  border-radius: 5px;
  margin-bottom: 40px;

  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 2;

  h2 {
    position: absolute;
    z-index: 1;
    margin-left: 20px;
    color: #8be0b7;
  }

  > div {
    overflow: hidden;
    width: 100%;
    height: 100%;
    will-change: transform;
  }

  > div > div {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 100%;
    will-change: transform;
    box-shadow: 0 62.5px 125px -25px rgba(50, 50, 73, 0.5),
      0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
    span {
      color: #deeeed;
      position: absolute;
      bottom: 15px;
      right: 20px;
    }
  }

  @media only screen and (min-width: 950px) {
    width: auto;
    margin: 15% 15% 0 0;
    height: auto;
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
    > div {
      width: 100%;
    }
  }
`

const pages = [
  [END, "END.", "endClothing"],
  // [Headless, "END. React", "headless"],
  [ads, "Banner Ads", "bannerAds"],
  [adCalculator, "Ad Calculator", "creativeCalculator"],
  [matchBetting, "Match betting", "matchBetting"],
  [homeFromHome, "Home From Home", "homeFromHome"],
  // [yawp, "Yawp", "yawp"],
  [zorokovick, "Zorokovick", "zorokovick"],
]

const Work = memo(({ openProject, setProject, setBackground }) => {
  const [propsState, setPropsState] = useState(false)
  const [bindState, setBindState] = useState(false)
  const index = useRef(0)
  const { innerWidth } = useWindowSize()

  const pageDivisions =
    typeof window !== `undefined` ? (window.innerWidth < 950 ? 100 : 4) : 4
  const pageDivisions2 =
    typeof window !== `undefined` ? (window.innerWidth < 950 ? 1 : 2) : 2

  const windowSize = typeof window !== `undefined` ? window.innerWidth : 1000

  const [props, set] = useSprings(pages.length, i => ({
    x: (i * windowSize) / pageDivisions,
    sc: 1,
    display: "block",
  }))

  const bind = useGesture(
    ({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
      if (down && distance > windowSize / pageDivisions / pageDivisions2)
        cancel(
          (index.current = clamp(
            index.current + (xDir > 0 ? -1 : 1),
            0,
            pages.length - 1
          ))
        )
      set(i => {
        if (i < index.current - 1 || i > index.current + 1)
          return { display: "none" }
        const x =
          ((i - index.current) * windowSize) / pageDivisions +
          (down ? xDelta : 0)
        const sc = down
          ? 1 - distance / windowSize / pageDivisions / pageDivisions2
          : 1
        return { x, sc, display: "block" }
      })
    }
  )

  useEffect(() => {
    setPropsState(props)
    setBindState(bind)
  })

  if (propsState && bindState) {
    if (innerWidth < 950) {
      return (
        <WorkSC>
          <h2>Work</h2>
          {propsState.map(({ x, display, sc }, i) => (
            <animated.div
              {...bindState}
              key={i}
              style={{
                display,
                transform: x.interpolate(x => `translate3d(${x}px,0,0)`),
              }}
              onMouseOver={() => setBackground(true)}
              onMouseOut={() => setBackground(false)}
              // will probably have to bind some click events to chnage background
            >
              <animated.div
                style={{
                  transform: sc.interpolate(s => `scale(${s})`),
                  backgroundImage: `url(${pages[i][0]})`,
                }}
                onClick={() => {
                  openProject(true)
                  scroll.scrollToTop({
                    duration: 10,
                    smooth: "easeInOutQuint",
                  })
                  setProject(ProjectDictonary[pages[i][2]])
                }}
              >
                <span>{pages[i][1]}</span>
              </animated.div>
            </animated.div>
          ))}
        </WorkSC>
      )
    }

    return propsState.map(({ x, display, sc }, i) => (
      <WorkSC>
        <h2>Work</h2>
        <animated.div
          {...bindState}
          key={i}
          style={{
            display,
            transform: x.interpolate(x => `translate3d(${x}px,0,0)`),
          }}
          onMouseOver={() => setBackground(true)}
          onMouseOut={() => setBackground(false)}
          // will probably have to bind some click events to chnage background
        >
          <animated.div
            style={{
              transform: sc.interpolate(s => `scale(${s})`),
              backgroundImage: `url(${pages[i][0]})`,
            }}
            onClick={() => {
              openProject(true)
              setProject(ProjectDictonary[pages[i][2]])
            }}
          >
            <span>{pages[i][1]}</span>
          </animated.div>
        </animated.div>
      </WorkSC>
    ))
  }
  return null
})

export default Work
