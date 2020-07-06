/** @jsx jsx */
import { jsx } from "theme-ui"
import BaseLayout from "../components/layout"

import { IconContext } from "react-icons"

export default function Layout({ location, pageContext, children }) {
  return (
    <IconContext.Provider value={{ style: { verticalAlign: `middle` } }}>
      <BaseLayout location={location}>{children}</BaseLayout>
    </IconContext.Provider>
  )
}
