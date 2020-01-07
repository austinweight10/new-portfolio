import React from "react"
import "./layout.css"

// todo before go live
// add the same loader as old site with the gif
// rotate all mouse overs

const Layout = ({ children }) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed|Prata&display=swap"
        rel="stylesheet"
      ></link>
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
