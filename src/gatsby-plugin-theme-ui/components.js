import React from "react"

import CodeBlock from "../components/code-block"
import MdxLink from "../components/mdx-link"
import CloudCallout from "../components/shared/cloud-callout"
import Pullquote from "../components/shared/pullquote"
import EggheadEmbed from "../components/shared/egghead-embed"

export default {
  CloudCallout,
  Pullquote,
  EggheadEmbed,
  a: MdxLink,
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
}
