import React, { useEffect, memo } from "react"
import styled from "styled-components"
import { TweenMax } from "gsap/TweenMax"
import "./base.css"
import displacemnet from "../images/background/displacement/1404110009_X_SAVANNAH_GEORGIA_xlarge.jpg"
import Img22 from "../images/background/Img22.jpg"
import Img21 from "../images/background/Img21.jpg"
import Img23 from "../images/background/Img24.jpg"

var slide = 0

var THREE = require("three")

const BackgroundEffect = memo(() => {
  useEffect(() => {
    const hoverEffect = opts => {
      const vertex = `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }
      `

      const fragment = `
          varying vec2 vUv;
  
          uniform sampler2D texture;
          uniform sampler2D texture2;
          uniform sampler2D texture3;
          uniform sampler2D disp;
  
          uniform float dispFactor;
          uniform float effectFactor;
  
          void main() {
  
              vec2 uv = vUv;
  
              vec4 disp = texture2D(disp, uv);
  
              vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
              vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
              vec2 distortedPosition3 = vec2(uv.x +  dispFactor * (disp.r*effectFactor), uv.y);
  
              vec4 _texture = texture2D(texture, distortedPosition);
              vec4 _texture2 = texture2D(texture2, distortedPosition2);
              vec4 _texture3 = texture2D(texture3, distortedPosition3);

              // vec4 _textureMix1 = mix(_texture, _texture2, dispFactor)
              // vec4 _textureMix2 = mix(_texture2, _texture3, dispFactor)
              // vec4 finalTexture = mix(_textureMix1, _textureMix2, dispFactor)
  
              // mix only takes 2 images
              // to undo just return one mix
              // vec4 finalTexture = mix(_texture, _texture2, dispFactor) + mix(_texture2, _texture3, dispFactor);
              vec4 finalTexture = mix(_texture, _texture2, dispFactor);
  
              gl_FragColor = finalTexture;
          }
      `

      // todo can hard code these as only one
      const parent = opts.parent || console.warn("no parent")
      const dispImage =
        opts.displacementImage || console.warn("displacement image missing")
      const image1 = opts.image1 || console.warn("first image missing")
      const image2 = opts.image2 || console.warn("second image missing")
      const image3 = opts.image3 || console.warn("third image missing")
      const intensity = opts.intensity || 1
      const speedIn = opts.speedIn || 1.6
      const easing = opts.easing || undefined

      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(
        parent.offsetWidth / -2,
        parent.offsetWidth / 2,
        parent.offsetHeight / 2,
        parent.offsetHeight / -2,
        1,
        1000
      )

      camera.position.z = 1

      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        // alpha: true,
      })

      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setClearColor(0xffffff, 0.0)
      renderer.setSize(parent.offsetWidth, parent.offsetHeight)
      parent.appendChild(renderer.domElement)

      const loader = new THREE.TextureLoader()
      loader.crossOrigin = ""
      const texture1 = loader.load(image1)
      const texture2 = loader.load(image2)
      const texture3 = loader.load(image3)

      const disp = loader.load(dispImage)
      disp.wrapS = disp.wrapT = THREE.RepeatWrapping

      texture1.magFilter = texture2.magFilter = THREE.LinearFilter
      texture1.minFilter = texture2.minFilter = THREE.LinearFilter

      texture2.magFilter = texture3.magFilter = THREE.LinearFilter
      texture2.minFilter = texture3.minFilter = THREE.LinearFilter

      texture1.anisotropy = renderer.getMaxAnisotropy()
      texture2.anisotropy = renderer.getMaxAnisotropy()
      texture3.anisotropy = renderer.getMaxAnisotropy()

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          effectFactor: { type: "f", value: intensity },
          dispFactor: { type: "f", value: 0.0 },
          texture: { type: "t", value: texture1 },
          texture2: { type: "t", value: texture2 },
          texture3: { type: "t", value: texture3 },
          disp: { type: "t", value: disp },
        },

        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0,
      })

      const geometry = new THREE.PlaneBufferGeometry(
        parent.offsetWidth,
        parent.offsetHeight,
        1
      )

      const object = new THREE.Mesh(geometry, mat)
      scene.add(object)

      // todo here set up a listener that accepts a value
      // will need to be bound to the window so this does not rerender
      // will also have to preload every image we want

      setInterval(() => {
        TweenMax.to(mat.uniforms.dispFactor, speedIn, {
          value: slide ? 0 : 1,
          ease: easing,
        })
        slide = slide ? 0 : 1
      }, 2000)

      window.addEventListener("resize", function(e) {
        renderer.setSize(parent.offsetWidth, parent.offsetHeight)
      })

      const animate = function() {
        requestAnimationFrame(animate)

        renderer.render(scene, camera)
      }
      animate()
    }

    // todo just grab the elemnt that we need
    Array.from(document.querySelectorAll(".grid__item-img")).forEach(el => {
      const imgs = Array.from(el.querySelectorAll("img"))
      new hoverEffect({
        parent: el,
        intensity: el.dataset.intensity || undefined,
        speedIn: el.dataset.speedin || undefined,
        speedOut: el.dataset.speedout || undefined,
        easing: el.dataset.easing || undefined,
        image1: imgs[0].getAttribute("src"),
        image2: imgs[1].getAttribute("src"),
        image3: imgs[2].getAttribute("src"),
        displacementImage: el.dataset.displacement,
      })
    })
  })

  // update class names
  return (
    <div class="theme-2">
      <div
        class="grid__item-img"
        data-displacement={displacemnet}
        data-intensity="-0.65"
        data-speedIn="1.2"
        data-speedOut="1.2"
      >
        <img src={Img22} alt="Image" />
        <img src={Img21} alt="Image" />
        <img src={Img23} alt="Image" />
      </div>
    </div>
  )
})

const HooksMain = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  top: 0px;
  opacity: ${props => (props.background ? "1" : "0")};
  pointer-events: none;

  transition-property: opacity;
  transition-duration: 0.6s;
  transition-delay: 0.6s;
`

export default ({ background }) => (
  <HooksMain background={background}>
    <BackgroundEffect />
  </HooksMain>
)
