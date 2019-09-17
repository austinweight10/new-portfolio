import React from "react"
import styled from "styled-components"
import { animateScroll as scroll } from "react-scroll"

const OverlaySC = styled.div`
  width: 100vw;
  height: 100vh;
  position: ${props => (props.active ? "fixed" : "absolute")};
  opacity: ${props => (props.active ? "0.3" : "0")};
  transition: transform 1.2s;
  transform: ${props =>
    props.active
      ? "translate3d(90%, 0px, 0px);"
      : "translate3d(0%, 0px, 0px);"};
  background: ${props => (props.active ? "#f1f1f1" : null)};
  z-index: ${props => (props.active ? "1000" : "-3")};
  box-shadow: ${props => (props.active ? "3px 3px 4px 7px #e8e8e8" : null)};
  -moz-box-shadow: ${props =>
    props.active ? "3px 3px 4px 7px #e8e8e8" : null};
  -webkit-box-shadow: ${props =>
    props.active ? "3px 3px 4px 7px #e8e8e8" : null};
`

const Overlay = ({ active, close }) => (
  <OverlaySC
    active={active}
    onClick={() => {
      scroll.scrollToTop({
        duration: 1000,
        smooth: "easeInOutQuint",
      })
      setTimeout(() => {
        close(false)
      }, 1000)
    }}
  />
)

export default Overlay
