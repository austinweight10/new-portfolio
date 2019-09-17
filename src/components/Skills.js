import React, { useRef } from "react"
import clamp from "lodash-es/clamp"
import swap from "lodash-move"
import { useGesture } from "react-use-gesture"
import { useSprings, animated, interpolate } from "react-spring"
import styled from "styled-components"

// add a really cool hover effect to each one
// like a shimmer with slight scale increase

const SkillsSC = styled.div`
  width: 100vw;
  height: auto;
  position: relative;
  overflow: scroll;
  cursor: grab;
  border-radius: 5px;

  transition: box-shadow 3s;
  transition-delay: 1s;

  ${"" /* todo make sure everything uses webkit */}
  box-shadow: ${props =>
    props.hideShadow ? null : "13px 15px 10px 1px #e8e8e8"};
  -moz-box-shadow: ${props =>
    props.hideShadow ? null : "13px 15px 10px 1px #e8e8e8"};
  -webkit-box-shadow: ${props =>
    props.hideShadow ? null : "13px 15px 10px 1px #e8e8e8"};

  .draggable-main {
    width: 80%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    height: 30px;
  }

  .content > div {
    position: absolute;
    height: 30px;
    overflow: visible;
    pointer-events: auto;
    transform-origin: 50% 50% 0px;
    border-radius: 5px;
    color: white;
    margin: 0 20px;
    width: calc(100% - 40px);
  }

  .content > div > h4 {
    padding-left: 20px;
    font-size: 15px;
    letter-spacing: 1.4px;
    line-height: 30px;
    margin: 0px;
  }

  h2 {
    padding-left: 20px;
    transition: color 3s;
    transition-delay: 1s;
    color:  ${props => (props.hideShadow ? "white" : null)};
  }

  ${"" /* todo make bellow a function */}
  .content > div:nth-child(1) {
    background: linear-gradient(135deg, #ffb8a8 0%, #ff5733 100%);
  }
  .content > div:nth-child(2) {
    background: linear-gradient(135deg, #deeeed 0%, #8be0b7 100%);
  }
  .content > div:nth-child(3) {
    background: linear-gradient(135deg, #afb3bd 0%, #82858c 100%);
  }
  .content > div:nth-child(4) {
    background: linear-gradient(135deg, #ffb8a8 0%, #ff5733 100%);
  }
  .content > div:nth-child(5) {
    background: linear-gradient(135deg, #deeeed 0%, #8be0b7 100%);
  }
  .content > div:nth-child(6) {
    background: linear-gradient(135deg, #afb3bd 0%, #82858c 100%);
  }
  .content > div:nth-child(7) {
    background: linear-gradient(135deg, #ffb8a8 0%, #ff5733 100%);
  }
  .content > div:nth-child(8) {
    background: linear-gradient(135deg, #deeeed 0%, #8be0b7 100%);
  }
  .content > div:nth-child(9) {
    background: linear-gradient(135deg, #afb3bd 0%, #82858c 100%);
  }
  .content > div:nth-child(10) {
    background: linear-gradient(135deg, #ffb8a8 0%, #ff5733 100%);
  }
  .content > div:nth-child(11) {
    background: linear-gradient(135deg, #deeeed 0%, #8be0b7 100%);
  }
  .content > div:nth-child(12) {
    background: linear-gradient(135deg, #afb3bd 0%, #82858c 100%);
  }
  .content > div:nth-child(13) {
    background: linear-gradient(135deg, #ffb8a8 0%, #ff5733 100%);
  }
  .content > div:nth-child(14) {
    background: linear-gradient(135deg, #deeeed 0%, #8be0b7 100%);
  }
  .content > div:nth-child(15) {
    background: linear-gradient(135deg, #afb3bd 0%, #82858c 100%);
  }
  .content > div:nth-child(16) {
    background: linear-gradient(135deg, #ffb8a8 0%, #ff5733 100%);
  }
  .content > div:nth-child(17) {
    background: linear-gradient(135deg, #deeeed 0%, #8be0b7 100%);
  }
  .content > div:nth-child(18) {
    background: linear-gradient(135deg, #afb3bd 0%, #82858c 100%);
  }
  .content > div:nth-child(19) {
    background: linear-gradient(135deg, #ffb8a8 0%, #ff5733 100%);
  }
  .content > div:nth-child(20) {
    background: linear-gradient(135deg, #deeeed 0%, #8be0b7 100%);
  }
  .content > div:nth-child(21) {
    background: linear-gradient(135deg, #afb3bd 0%, #82858c 100%);
  }
  .content > div:nth-child(22) {
    background: linear-gradient(135deg, #ffb8a8 0%, #ff5733 100%);
  }
  .content > div:nth-child(23) {
    background: linear-gradient(135deg, #deeeed 0%, #8be0b7 100%);
  }
  .content > div:nth-child(24) {
    background: linear-gradient(135deg, #afb3bd 0%, #82858c 100%);
  }
  .content > div:nth-child(25) {
    background: linear-gradient(135deg, #ffb8a8 0%, #ff5733 100%);
  }
  .content > div:nth-child(26) {
    background: linear-gradient(135deg, #deeeed 0%, #8be0b7 100%);
  }
  .content > div:nth-child(27) {
    background: linear-gradient(135deg, #afb3bd 0%, #82858c 100%);
  }
  .content > div:nth-child(28) {
    background: linear-gradient(135deg, #ffb8a8 0%, #ff5733 100%);
  }
  .content > div:nth-child(29) {
    background: linear-gradient(135deg, #deeeed 0%, #8be0b7 100%);
  }
  .content > div:nth-child(30) {
    background: linear-gradient(135deg, #afb3bd 0%, #82858c 100%);
  }
  .content > div:nth-child(31) {
    background: linear-gradient(135deg, #ffb8a8 0%, #ff5733 100%);
  }
  .content > div:nth-child(32) {
    background: linear-gradient(135deg, #deeeed 0%, #8be0b7 100%);
  }
  .content > div:nth-child(33) {
    background: linear-gradient(135deg, #afb3bd 0%, #82858c 100%);
  }
  .content > div:nth-child(34) {
    background: linear-gradient(135deg, #ffb8a8 0%, #ff5733 100%);
  }
  .content > div:nth-child(35) {
    background: linear-gradient(135deg, #deeeed 0%, #8be0b7 100%);
  }
  .content > div:nth-child(36) {
    background: linear-gradient(135deg, #afb3bd 0%, #82858c 100%);
  }

  .content > div:last-child {
    margin-bottom: 20px;
  }

  @media only screen and (min-width: 950px) {
    width: auto;
    margin: 15% 15% 0 0;
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 4;
  }
`

// rename
const fn = (order, down, originalIndex, curIndex, y) => index =>
  down && index === originalIndex
    ? {
        y: curIndex * 50 + y,
        scale: 1.1,
        zIndex: "1",
        shadow: 15,
        immediate: n => n === "y" || n === "zIndex",
      }
    : {
        y: order.indexOf(index) * 50,
        scale: 1,
        zIndex: "0",
        shadow: 1,
        immediate: false,
      }

const items = [
  "JAVASCRIPT & ES6",
  "CSS, SASS & LESS",
  "HTML5",
  "REACT & REDUX",
  "JQUERY & KNOCKOUT",
  "GULP & GRUNT",
  "NPM & YARN",
  "NODE, EXPRESS & NEXT",
  "PHP",
  "HTML EMAIL & MJML",
  "DOCKER & KUBERNETES",
  "GIT & BITBUCKET",
  "GOOGLE TAG MANAGER",
  "DYNATRACE",
  "WORDPRESSS",
  "MAGENTO & MAGENTO 2",
  "TENSORFLOW",
  "D3.JS & Three.js",
  "TESTING & TDD",
  "IDEA GENERATION",
  "GRAPHIC DESIGN",
  "ADVERTISING",
  "WEB DESIGN",
  "WIREFRAMING",
  "ILLUSTRATION",
  "PHOTOGRAPHY",
  "TYPOGRAPHY",
  "UI DESIGN",
  "PAGE LAYOUT",
  "INVISION",
  "ADOBE SUITE",
]

const Skills = ({ hideShadow }) => {
  const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useGesture(({ args: [originalIndex], down, delta: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(
      Math.round((curIndex * 100 + y) / 100),
      0,
      items.length - 1
    )
    const newOrder = swap(order.current, curIndex, curRow)
    setSprings(fn(newOrder, down, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) order.current = newOrder
  })
  return (
    <SkillsSC hideShadow={hideShadow}>
      <div className="content" style={{ height: items.length * 30 }}>
        <h2>Skills</h2>
        {springs.map(({ zIndex, shadow, y, scale }, i) => (
          <animated.div
            {...bind(i)}
            key={i}
            style={{
              zIndex,
              boxShadow: shadow.interpolate(
                s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
              ),
              transform: interpolate(
                [y, scale],
                (y, s) => `translate3d(0,${y}px,0) scale(${s})`
              ),
            }}
            children={<h4>{items[i]}</h4>}
          />
        ))}
      </div>
    </SkillsSC>
  )
}

export default Skills
