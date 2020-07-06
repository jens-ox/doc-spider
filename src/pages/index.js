/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import { MdArrowForward as ArrowForwardIcon } from "react-icons/md"

import Container from "../components/container"
import MastheadContent from "../components/masthead"
import Diagram from "../components/diagram"
import FuturaParagraph from "../components/futura-paragraph"
import Button from "../components/button"
import PageMetadata from "../components/page-metadata"
import FooterLinks from "../components/shared/footer-links"
import {
  setupScrollersObserver,
  unobserveScrollers,
} from "../utils/scrollers-observer"

class IndexRoute extends React.Component {
  componentDidMount() {
    setupScrollersObserver()
  }

  componentWillUnmount() {
    unobserveScrollers()
  }

  render() {
    return (
      <>
        <PageMetadata description="Blazing fast modern site generator for React. Go beyond static sites: build, e-commerce sites, full-blown apps, and more with Gatsby." />
        <main
          id={`reach-skip-nav`}
          css={{
            display: `flex`,
            flexDirection: `row`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
          }}
        >
          <MastheadContent />
          <div
            sx={{
              width: `100%`,
              p: 8,
              pt: 0,
            }}
          >
            <Diagram />
          </div>
          <div css={{ flex: `1 1 100%` }}>
            <Container withSidebar={false}>
              <section css={{ textAlign: `center` }}>
                <h1 sx={{ fontWeight: `heading`, mt: 0 }}>Curious yet?</h1>
                <FuturaParagraph>
                  It only takes a few minutes to get up and running!
                </FuturaParagraph>
                <Button
                  secondary
                  variant="large"
                  to="/docs/"
                  tracking="Curious Yet -> Get Started"
                  overrideCSS={{ mt: 5 }}
                  icon={<ArrowForwardIcon />}
                >
                  Get Started
                </Button>
              </section>
            </Container>
          </div>
        </main>
        <FooterLinks />
      </>
    )
  }
}

export default IndexRoute

export const pageQuery = graphql`
  query IndexRouteQuery {
    file(relativePath: { eq: "gatsby-explanation.png" }) {
      childImageSharp {
        fluid(maxWidth: 870) {
          src
          srcSet
          sizes
        }
      }
    }
  }
`
