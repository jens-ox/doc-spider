const Promise = require(`bluebird`)

// Split the logic into files based on the section of the website.
// The eventual goal is to split www into different themes per section.
const docs = require(`./src/utils/node/docs.js`)
const sections = [docs]

// Run the provided API on all defined sections of the site
async function runApiForSections(api, helpers) {
  await Promise.all(
    sections.map(section => {
      if (section[api]) {
        section[api](helpers)
      }
    })
  )
}

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  const currentCommitSHA = require(`child_process`)
    .execSync(`git rev-parse HEAD`, {
      encoding: `utf-8`,
    })
    .trim()

  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        "process.env.COMMIT_SHA": JSON.stringify(currentCommitSHA),
      }),
    ],
  })
}

exports.createSchemaCustomization = async helpers => {
  await runApiForSections(`createSchemaCustomization`, helpers)

  const {
    actions: { createTypes },
  } = helpers

  // Explicitly define Airtable types so that queries still work
  // when there are no events.
  // TODO make upstream change to gatsby-source-airtable
  createTypes(/* GraphQL */ `
    type Airtable implements Node {
      id: ID!
      data: AirtableData
    }

    type AirtableData @dontInfer {
      name: String @proxy(from: "Name_of_Event")
      organizerFirstName: String @proxy(from: "Organizer_Name")
      organizerLastName: String @proxy(from: "Organizer's_Last_Name")
      date: Date @dateformat @proxy(from: "Date_of_Event")
      location: String @proxy(from: "Location_of_Event")
      url: String @proxy(from: "Event_URL_(if_applicable)")
      type: String @proxy(from: "What_type_of_event_is_this?")
      hasGatsbyTeamSpeaker: Boolean @proxy(from: "Gatsby_Speaker_Approved")
      approved: Boolean @proxy(from: "Approved_for_posting_on_event_page")
    }
  `)
}

exports.createResolvers = async helpers => {
  await runApiForSections(`createResolvers`, helpers)
}

exports.onCreateNode = async helpers => {
  await runApiForSections(`onCreateNode`, helpers)
}

exports.createPages = async helpers => {
  await runApiForSections(`createPages`, helpers)
}
