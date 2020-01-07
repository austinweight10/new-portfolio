import React from "react"
import clamp from "lodash-es/clamp"
import { useSpring, animated } from "react-spring"
import { useGesture } from "react-with-gesture"
import styled from "styled-components"
import logo from "../images/logo/AustinWeight.gif"
import logoGif from "../images/logo/AustinWeightLogo.gif"

const LogoSC = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0;

  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 1;

  > div {
    cursor: -webkit-grab;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    margin: 50% auto auto;
    justify-content: center;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: ${props => "url(" + logo + ")"};
    &:hover {
      background-image: ${props => "url(" + logoGif + ")"};
    }
  }

  > div:active {
    cursor: -webkit-grabbing;
  }

  @media only screen and (min-width: 950px) {
    width: auto;
    height: auto;
    margin: 15% 0 0 15%;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    > div {
      margin: 0 25%;
      width: 50%;
      height: 100%;
    }
  }
`

const Logo = () => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
  const bind = useGesture(({ down, delta, velocity }) => {
    velocity = clamp(velocity, 2, 20)
    set({
      xy: down ? delta : [0, 0],
      config: { mass: velocity, tension: 700 * velocity, friction: 30 },
    })
  })
  return (
    <LogoSC logo={logo} logoGif={logoGif}>
      <animated.div
        {...bind()}
        style={{
          transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
        }}
      />
    </LogoSC>
  )
}

export default Logo
