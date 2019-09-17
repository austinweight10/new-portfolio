import React from "react"
import styled from "styled-components"

// add a max width to text
// At larger screens three columns
// add a slight tilt thing simular to download cv to each image that makes it slightly bigger adds drop shoddow and perspective

// need css tanstions to load all the images/text - want it to really show off my skills

// todo progress bar down the left had side
// position fix in green just to know how far - can try it going different way to the page

const ProjectSC = styled.div`
  -webkit-transition: margin-left 1.2s;
  transition: margin-left 1.2s;
  margin-left: ${props => (props.active ? "0%" : "-90vw")};
  width: 90vw;
  position: absolute;
  pointer-events: none;
  overflow: inherit;
  padding: 50px 60px;
  width: calc(90vw - 120px);
  img {
    width: calc(90vw - 120px);
    margin: 40px 0;
    border-radius: 5px;
    box-shadow: 13px 15px 10px 1px #e8e8e8;
    -moz-box-shadow: 13px 15px 10px 1px #e8e8e8;
    -webkit-box-shadow: 13px 15px 10px 1px #e8e8e8;
  }
  @media only screen and (min-width: 950px) {
    p {
      column-count: 2;
      column-gap: 40px;
    }
  }
`
const ImageWrapper = styled.div`
  @media only screen and (min-width: 950px) {
    column-count: ${props => (props.title === "Banner Ads" ? null : "2")};
    column-gap: 40px;
    display: ${props => (props.title === "Banner Ads" ? "flex" : null)};
    flex-wrap: ${props => (props.title === "Banner Ads" ? "wrap" : null)};
    justify-content: ${props =>
      props.title === "Banner Ads" ? "center" : null};
    img {
      width: ${props =>
        props.title === "Banner Ads" ? "300px" : "calc(45vw - 80px)"};
      margin: ${props =>
        props.title === "Banner Ads" ? "40px 20px" : "40px auto"};
    }
    video {
      width: 300px;
      margin: 40px 20px;
    }
  }
`

const Projects = ({ active, project }) => {
  return (
    <ProjectSC active={active}>
      <div>
        <h2>{project.title}</h2>
        <p>{project.intro}</p>
        <ImageWrapper title={project.title}>
          {project.images && project.images.map(x => <img src={x} />)}
          {project.videos
            ? project.videos.map(x => <video autoPlay muted src={x} />)
            : null}
        </ImageWrapper>
      </div>
    </ProjectSC>
  )
}

export default Projects
