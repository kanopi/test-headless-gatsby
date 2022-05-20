import * as React from "react"
import { Link } from "gatsby"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import Seo from "../components/seo"

const Recipes = ({data}) => (
  <Layout>
    <Seo title="Recipes" />
    <h1>Recipes</h1>

    <div className="recipe-list">
    {data.allNodeRecipe.edges.map(({node}) => {
      return (
        <div className="recipe-item">
          <div className="img"><img 
            src={node.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.resize.src} 
            alt={node.relationships.field_media_image.field_media_image.alt}
            width={node.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.resize.width}
            height={node.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.resize.height}
          /></div>
          <p className="title"><Link to={node.path.alias}>{node.title}</Link></p>
        </div>
      )
    })}
    </div>

    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const query = graphql`
query Recipes {
  allNodeRecipe {
    edges {
      node {
        id
        title
        path {
          alias
        }
        field_cooking_time
        field_difficulty
        relationships {
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
                  absolutePath
                  publicURL
                  childImageSharp {
                    resize(width: 256) {
                      src
                      tracedSVG
                      width
                      height
                      aspectRatio
                      originalName
                    }
                  }
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

export default Recipes
