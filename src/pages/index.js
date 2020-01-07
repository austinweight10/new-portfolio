import React, { useState } from "react"
import useWindowSize from "@rooks/use-window-size"
import Goo from "../components/Goo"
import Logo from "../components/Logo"
import Intro from "../components/Intro"
import Contact from "../components/Contact"
import Work from "../components/Work"
import Skills from "../components/Skills"
import Brands from "../components/Brands"
import About from "../components/About"
import DownloadCV from "../components/DownloadCV"
import Projects from "../components/Projects"
import Overlay from "../components/Overlay"
import Layout from "../components/layout"
// import ImageEffect from "../components/ImageEffect"
import SEO from "../components/seo"
import styled from "styled-components"
import useDidMount from "@rooks/use-did-mount"
import cursor from "../images/cursor.png"

// use react lazy for ImageEffect and Projects

const PageLayout = styled.div`
  transition: margin-left 1.2s;
  margin: 20px;
  margin-left: ${props => (props.pageSlider ? "90%" : "20px")};
  width: calc(100% - 100px);
  display: grid;
  cursor: url(${cursor}), auto;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 20% 18% 15% 15% 5% 10% 10%;
  grid-gap: 80px 20px;

  @media only screen and (min-width: 950px) {
    width: 100vw;
    height: 100vh;
    margin: 0;
    grid-gap: 10px;
    margin-left: ${props => (props.pageSlider ? "90%" : "0%")};
    padding: 0;
    grid-template-columns: 25% 25% 25%;
    grid-template-rows: 25% 25% 25%;
  }
`

const IndexPage = () => {
  const [pageSlider, setPageSlider] = useState(false)
  const [background, setBackground] = useState(false)
  const [project, setProject] = useState({})
  const [mounted, setMounted] = useState(false)
  const openProject = bool => {
    setPageSlider(bool)
  }
  const { innerWidth } = useWindowSize()

  useDidMount(() => {
    setMounted(true)
  })

  return (
    <Layout>
      <SEO title="Home" />
      <Overlay active={pageSlider} close={openProject} />
      <Goo />
      {/* {innerWidth > 992 && <ImageEffect background={background} />} */}
      <Projects active={pageSlider} project={project} />
      <PageLayout pageSlider={pageSlider}>
        <Logo />
        {innerWidth > 992 && <Intro />}
        <Contact hideShadow={background} />
        <Work
          openProject={openProject}
          setProject={setProject}
          setBackground={setBackground}
        />
        <Skills hideShadow={background} />
        <Brands hideShadow={background} />
        <About />
        <DownloadCV mounted={mounted} />
      </PageLayout>
    </Layout>
  )
}

export default IndexPage
