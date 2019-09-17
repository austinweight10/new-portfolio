import React from "react"
import PropTypes from "prop-types"
import "./layout.css"

// should probaly add the same loader as old site with the gif

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
