require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `GatsbyJS`,
    siteUrl: `https://www.gatsbyjs.org`,
    description: `Blazing fast modern site generator for React`,
    twitter: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/docs/`,
      },
    },
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          // Relative paths when importing components from MDX break translations of the docs,
          // so use an alias instead inside MDX:
          // https://www.gatsbyjs.org/contributing/docs-and-components/#importing-other-components
          "@components": `${__dirname}/src/components`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `${__dirname}/src/utils/typography`,
      },
    },
    `gatsby-transformer-documentationjs`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/diagram`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        shouldBlockNodeFromTransformation(node) {
          return (
            [`NPMPackage`, `NPMPackageReadme`].includes(node.internal.type) ||
            (node.internal.type === `File` &&
              node.sourceInstanceName === `gatsby-core`)
          )
        },
        gatsbyRemarkPlugins: [
          `gatsby-remark-embedder`,
          `gatsby-remark-graphviz`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 786,
              backgroundColor: `#ffffff`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.5rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: 104,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-embedder`,
          `gatsby-remark-graphviz`,
          `gatsby-remark-code-titles`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 786,
              backgroundColor: `#ffffff`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.5rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: 104,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases: {
                dosini: `ini`,
                env: `bash`,
                es6: `js`,
                flowchart: `none`,
                gitignore: `none`,
                gql: `graphql`,
                htaccess: `apacheconf`,
                mdx: `markdown`,
                ml: `fsharp`,
                styl: `stylus`,
              },
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          // convert images using http to https in plugin library READMEs
          `gatsby-remark-http-to-https`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#9D7CBF`,
        showSpinner: false,
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-transformer-csv`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets\/(guidelines|icons|ornaments)\/.*.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/*": [`Referrer-Policy: strict-origin-when-cross-origin`],
        },
      },
    },
    `gatsby-plugin-netlify-cache`,
    {
      resolve: `gatsby-transformer-screenshot`,
      options: {
        nodeTypes: [`StartersYaml`],
      },
    },
    // `gatsby-plugin-subfont`,
  ],
}
