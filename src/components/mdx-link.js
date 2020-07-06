import React from "react"
import { Link } from "gatsby"

const isHash = str => /^#/.test(str)
const isInternal = to => /^\/(?!\/)/.test(to)
const isFile = to => /\..+$/.test(to)

// Only use <LocalizedLink /> for internal links that aren't hashes or files
export default function MdxLink({ href, ...props }) {
  if (isHash(href) || !isInternal(href) || isFile(href)) {
    return <a {...props} href={href} />
  } else {
    return <Link {...props} to={href} />
  }
}
