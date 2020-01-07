import React, { useState } from "react"
import styled from "styled-components"
import { useSpring, config, animated } from "react-spring"
import useWindowSize from "@rooks/use-window-size"
import cursor from "../images/clickToEnlarge.png"
import close from "../images/close.png"

const AboutSC = styled.div`
  width: calc(100% - 40px);
  height: 100%;
  position: relative;
  overflow: scroll;
  border-radius: 5px;
  background: linear-gradient(135deg, #8be0b7 0%, #deeeed 100%);
  padding: 0 20px 20px;
  cursor: url(${cursor}) 30 30, auto;
  will-change: width, height;

  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 4;
  grid-row-end: 4;

  @media only screen and (min-width: 950px) {
    width: auto;
    height: auto;
    margin: 15% 15% 15% 0;
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 5;
  }
`

const AboutOpenSC = styled(animated.div)`
  position: fixed;
  margin: auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100vh;
  z-index: 20000;
  cursor: url(${close}) 30 30, auto;

  .info {
    background: linear-gradient(135deg, #afb3bd 0%, #82858c 100%);
    width: 50%;
    height: 50%;
    border-radius: 5px;
    overflow: scroll;
    padding: 20px;
    h2 {
      font-size: 30px;
      color: white;
    }
    p {
      font-size: 18px;
      line-height: 28px;
      color: white;
    }
  }
`
const Info = () => (
  <div className="info">
    <h2>About</h2>
    <div>
      <p>
        In my student days studing graphic design at UCA I knew my interests
        lied in the web. Emergent behaviours and designing for complexity struck
        a appreciation for networks and development.
      </p>
      <p>
        As a little boy, my favourite thing in the world was Lego. I loved how I
        could create new worlds brick by brick and it sparked a life-long love
        of design. Now fully-fledged and grown-up, I have found an industry that
        requires the same skills. Fitting together lots of smaller blocks
        whether this be building components in React or using functional
        programming to create something bigger and better.
      </p>
      <p>
        As a developer, I have enjoyed working on projects from building both
        client and server-side with Node and React, custom JavaScript sites that
        analyse images to working on WordPress, Magneto 1 and 2 with experience
        in php and JavaScript. I have worked on 3D projects with three.js along
        with AI using tensor flow for classifying images and building forecasts
        for trends.
      </p>
      <p>
        I have experience working in advertising on campaigns from prospecting
        to remarketing. My passion lies within performance driven design that is
        user tested. I enjoy analysis as I feel this is key to ensure
        statistically proven ideas are used to engage and advance business
        developments and break down concepts so they can be reused. In the
        design world, I find myself gravitating towards UX and how concepts can
        really influence customers.
      </p>
      <p>
        It wouldn't be a protfolio if there wasn't any shameless name dropping
        so to the left are a couple of companys I have been lucky enough to do
        work for.
      </p>
    </div>
  </div>
)

const About = () => {
  const [open, set] = useState(false)
  const { innerWidth } = useWindowSize()

  const { size, ...rest } = useSpring({
    config: config.stiff,
    size: open ? "100%" : "0%",
    position: open ? "fixed" : "relative",
    opacity: open ? "1" : "0.2",
    display: open ? "flex" : "none",
  })

  return (
    <>
      <AboutSC onClick={() => set(open => !open)}>
        <Info />
      </AboutSC>
      {innerWidth > 950 && (
        <AboutOpenSC style={{ ...rest }} onClick={() => set(open => !open)}>
          <Info />
        </AboutOpenSC>
      )}
    </>
  )
}

export default About
