const path = require("path");
const { resourceLimits } = require("worker_threads");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })

  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
    {
      allNodeRecipe {
        edges {
          node {
            id
            title
            drupal_id
            path {
              alias
            }
            field_cooking_time
            field_difficulty
            field_ingredients
            field_tags {
              drupal_internal__target_id
            }
            field_summary {
              processed
            }
            field_recipe_instruction {
              processed
            }
            field_preparation_time
            field_number_of_servings
            created(formatString:"MMMM DD, YYYY")
            revision_timestamp(formatString: "MMMM DD, YYYY")
            relationships {
              uid {
                display_name
              }
              field_tags {
                name
              }
              field_recipe_category {
                name
              }
              field_media_image {
                field_media_image {
                  width
                  height
                  alt
                }
                name
                relationships {
                  field_media_image {
                    filename
                    localFile {
                      publicURL
                    }
                  }
                }
              }
            }
          }
        }
      }
      allNodePage {
        edges {
          node {
            body {
              processed
            }
            title
            path {
              alias
            }
          }
        }
      }
      allNodeArticle {
        edges {
          node {
            title
            body {
              processed
            }
            path {
              alias
            }
            created(formatString:"MMMM DD, YYYY")
            relationships {
              uid {
                display_name
              }
              field_tags {
                name
              }
              field_media_image {
                field_media_image {
                  width
                  height
                  alt
                }
                name
                relationships {
                  field_media_image {
                    filename
                    localFile {
                      publicURL
                    }
                  }
                }
              }
            }        
          }
        }
      }
    }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const recipeTemplate = path.resolve(`src/templates/recipe.js`)
  result.data.allNodeRecipe.edges.forEach(({ node }) => {
    const path = node.path.alias;
    createPage({
      path,
      component: recipeTemplate,
      context: {
        recipe: node,
      }
    });
  })

  const pageTemplate = path.resolve(`src/templates/page.js`)
  result.data.allNodePage.edges.forEach(({ node }) => {
    const path = node.path.alias;
    createPage({
      path,
      component: pageTemplate,
      context: {
        page: node,
      }
    });
  })

  const articleTemplate = path.resolve(`src/templates/article.js`)
  result.data.allNodeArticle.edges.forEach(({ node }) => {
    const path = node.path.alias;
    createPage({
      path,
      component: articleTemplate,
      context: {
        article: node,
      }
    });
  })
}
