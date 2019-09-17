import React, { useState } from "react"
import { useSpring, animated as a } from "react-spring"
import styled from "styled-components"

import AbercrombieAndFitch from "../images/clients/AbercrombieAndFitch.png"
import aldo from "../images/clients/aldo.png"
import AOcom from "../images/clients/AOcom.png"
import autotrader from "../images/clients/autotrader.png"
import feelUnique from "../images/clients/feelUnique.png"
import footasylum from "../images/clients/footasylum.png"
import jigsaw from "../images/clients/jigsaw.png"
import jimmyChoo from "../images/clients/jimmyChoo.png"
import karenMillen from "../images/clients/karenMillen.png"
import matchesFashion from "../images/clients/matchesFashion.png"
import missguided from "../images/clients/missguided.png"
import monsoon from "../images/clients/monsoon.png"
import moo from "../images/clients/moo.png"
import whistles from "../images/clients/whistles.png"
import cursor from "../images/clickToSwap.png"

// need a click me cursor
// add a hover state / more dropshadow
// todo a way better switch, diagonal or spin
// sort images pixilated
// perhaps simular enlarge to download cv

const BrandsSC = styled.div`
  width: 100vw;
  height: auto;
  position: relative;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-radius: 5px;
  cursor: url(${cursor}) 30 30, auto;

  transition: box-shadow 3s;
  transition-delay: 1s;
  box-shadow: ${props =>
    props.hideShadow ? null : "-48px -48px 20px -50px #ff5733"};
  -moz-box-shadow: ${props =>
    props.hideShadow ? null : "-48px -48px 20px -50px #ff5733"};
  -webkit-box-shadow: ${props =>
    props.hideShadow ? null : "-48px -48px 20px -50px #ff5733"};

  ${"" /* -webkit-transition: all 200ms linear;
  -ms-transition: all 200ms linear;
  transition: all 200ms linear; */}
  &:hover {
    transform: scale(1.05);
    z-index: 2;
  }

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .c {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    will-change: transform, opacity;
  }

  .front,
  .back {
    background-size: contain;
    background-repeat: no-repeat;
  }

  .back {
    background-image: ${props => "url(" + props.backImage + ")"};
  }

  .front {
    background-image: ${props => "url(" + props.frontImage + ")"};
  }

  @media only screen and (min-width: 950px) {
    width: auto;
    margin: 0 0 15% 15%;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
  }
`

const brandImages = [
  AbercrombieAndFitch,
  aldo,
  AOcom,
  autotrader,
  feelUnique,
  footasylum,
  jigsaw,
  jimmyChoo,
  karenMillen,
  matchesFashion,
  missguided,
  monsoon,
  moo,
  whistles,
]

const Brands = ({ hideShadow }) => {
  const [flipped, set] = useState(false)

  const [frontImage, setFront] = useState(0)
  const [backImage, setBack] = useState(1)
  const [activeSide, setActiveSide] = useState(0)

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(000px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 10, tension: 1000, friction: 200 },
  })
  return (
    <BrandsSC
      frontImage={brandImages[frontImage]}
      backImage={brandImages[backImage]}
      hideShadow={hideShadow}
    >
      <div onClick={() => set(state => !state)}>
        {/* in state just add a number and make a loop  */}
        <a.div
          class="c back"
          style={{
            opacity: opacity.interpolate(o => 1 - o),
            transform,
          }}
        />
        <a.div
          class="c front"
          style={{
            opacity,
            transform: transform.interpolate(t => `${t} rotateX(180deg)`),
          }}
          onClick={() => {
            if (activeSide % 2) {
              setBack(backImage + 2)
              if (backImage > 11) {
                setBack(1)
                setFront(0)
              }
            } else {
              setFront(frontImage + 2)
              if (frontImage > 11) {
                setFront(0)
                setBack(1)
              }
            }

            setActiveSide(activeSide + 1)
          }}
        />
      </div>
    </BrandsSC>
  )
}

export default Brands
