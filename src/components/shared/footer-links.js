/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

const links = [
  { to: `/accessibility-statement/`, text: `Accessibility Statement` },
]

const FooterLinks = () => (
  <footer>
    <ul
      sx={{
        background: props => (props.bg ? props.bg : `0`),
        borderColor: `ui.border`,
        borderTopStyle: `solid`,
        borderTopWidth: `1px`,
        fontSize: 1,
        listStyle: `none`,
        m: 0,
        mb: props => (props.bottomMargin ? props.bottomMargin : 0),
        mt: 9,
        px: 6,
        py: 9,
        textAlign: `center`,
        width: `100%`,
        "& li": {
          display: `inline-block`,
          "&:after": {
            color: `textMuted`,
            content: `"•"`,
            padding: 3,
          },
          "&:last-of-type:after": {
            content: `none`,
          },
          "& a": {
            color: `navigation.linkDefault`,
            borderColor: `transparent`,
            "&:hover": {
              color: `navigation.linkHover`,
              borderColor: `link.hoverBorder`,
            },
          },
        },
      }}
    >
      {links.map(({ to, text }) => (
        <li key={to}>
          <Link to={to}>{text}</Link>
        </li>
      ))}
      <li>
        <a href="https://www.gatsbyjs.com">Gatsbyjs.com</a>
      </li>
    </ul>
  </footer>
)

export default FooterLinks
