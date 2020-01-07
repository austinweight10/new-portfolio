import React, { useState } from "react"
import { useSpring, animated, interpolate } from "react-spring"
import { useGesture } from "react-with-gesture"
import styled from "styled-components"

const ContactSC = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin-bottom: 40px;

  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 6;
  grid-row-end: 6;

  .item {
    position: relative;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    transform-origin: 50% 50% 0px;
    padding-left: 32px;
    padding-right: 32px;
    box-sizing: border-box;
    display: grid;
    align-items: center;
    text-align: center;
    border-radius: 5px;
    grid-template-columns: 30% 70%;

    box-shadow: ${props =>
      props.hideShadow ? null : "13px 15px 10px 1px #e8e8e8"};
    transition: box-shadow 3s;
    transition-delay: 1s;

    span {
      color: #ffb8a8;
      font-family: Barlow Semi Condensed, sans-serif;
      font-size: 18px;
      letter-spacing: 1.8px;
      text-transform: uppercase;
      text-align: center;
    }
  }

  .fg {
    cursor: -webkit-grab;
    background-color: #82858c;
    color: #deeeed;
    position: absolute;
    height: calc(100% - 40px);
    width: calc(100% - 40px);
    display: flex;
    align-items: center;
    text-align: center;
    border-radius: 5px;
    box-shadow: ${props =>
      props.hideShadow ? null : "0px 10px 30px -5px #deeeed"};
    transition: box-shadow 3s;
    transition-delay: 1s;
    padding: 20px;
    div {
      max-width: 100%;
      margin: 0 auto 20px;
      span {
        font-size: 14px;
        letter-spacing: 1.4px;
      }
    }
  }

  .fg:active {
    cursor: -webkit-grabbing;
    box-shadow: 0px 15px 30px -5px #deeeed;
  }

  .fg > * {
    pointer-events: none;
  }

  .av {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    &:before {
      content: "👋";
      font-size: 50px;
      left: 20px;
      position: absolute;
    }
  }

  @media only screen and (min-width: 950px) {
    width: auto;
    margin: 0 15% 15% 0;
    height: auto;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }
`

const Contact = ({ hideShadow }) => {
  const [bind, { delta, down }] = useGesture()
  const [triggeredEmail, setTriggeredEmail] = useState(false)
  const { x, bg, size } = useSpring({
    x: down ? delta[0] : 0,
    bg: `linear-gradient(120deg, ${
      delta[0] < 0 ? "#ff5733 0%, #ffb8a8" : "#ffb8a8 0%, #ff5733"
    } 100%)`,
    size: down ? 1.1 : 1,
    immediate: name => {
      setTimeout(() => {
        if (!triggeredEmail && down && name === "x") {
          window.location.href = "mailto:austinweight10@gmail.com"
          setTriggeredEmail(true)
          setTimeout(() => {
            setTriggeredEmail(false)
          }, 5000)
        }
      }, 500)
      return down && name === "x"
    },
  })
  const avSize = x.interpolate({
    map: Math.abs,
    range: [50, 300],
    output: ["scale(0.5)", "scale(1)"],
    extrapolate: "clamp",
  })
  return (
    <ContactSC hideShadow={hideShadow}>
      <animated.div {...bind()} class="item" style={{ background: bg }}>
        <animated.div
          class="av"
          style={{
            transform: avSize,
          }}
        ></animated.div>
        <animated.div
          class="fg"
          style={{
            transform: interpolate(
              [x, size],
              (x, s) => `translate3d(${x}px,0,0) scale(${s})`
            ),
          }}
        >
          <div>
            <h2>slide to get in contact</h2>
            <span>austinweight10@gmail.com</span>
            <br />
            <span>07780 995979</span>
          </div>
        </animated.div>
        <span>Whassup?</span>
      </animated.div>
    </ContactSC>
  )
}

export default Contact
