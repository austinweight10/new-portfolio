import React, { useState } from "react"
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
import ImageEffect from "../components/ImageEffect"
import SEO from "../components/seo"
import styled from "styled-components"
import useDidMount from "@rooks/use-did-mount"
import cursor from "../images/cursor.png"

// fix mobile layout
// use react lazy for ImageEffect and Projects

const PageLayout = styled.div`
  height: 100vh;
  display: flex;
  transition: margin-left 1.2s;
  margin-left: ${props => (props.pageSlider ? "90%" : "0%")};
  width: max-content;
  cursor: url(${cursor}), auto;

  @media only screen and (min-width: 950px) {
    width: 100vw;
    display: grid;
    grid-template-columns: 25% 25% 25% 25% 25%;
    grid-template-rows: 25% 25% 25% 25%;
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

  useDidMount(() => {
    setMounted(true)
  })

  return (
    <Layout>
      <SEO title="Home" />
      <Overlay active={pageSlider} close={openProject} />
      <Goo />
      <ImageEffect background={background} />
      <Projects active={pageSlider} project={project} />
      <PageLayout pageSlider={pageSlider}>
        <Logo />
        <Intro />
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
