import * as React from "react"
import { Link } from "gatsby"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import Seo from "../components/seo"

const Articles = ({data}) => (
  <Layout>
    <Seo title="Articles" />
    <h1>Articles</h1>

    <div className="article-list">
    {data.allNodeArticle.edges.map(({node}) => {
      return (
        <div className="article">
          <div className="img"><img 
            src={node.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.resize.src} 
            alt={node.relationships.field_media_image.field_media_image.alt}
            width={node.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.resize.width}
            height={node.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.resize.height}
          /></div>
          <p className="title"><Link to={node.path.alias}>{node.title}</Link></p>
          <div className="tags">{node.relationships.field_tags.map((tag) => (<span className="tag">{tag.name}</span>))}</div>
        </div>
      )
    })}
    </div>

    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const query = graphql`
query MyQuery {
    allNodeArticle {
      edges {
        node {
          title
          body {
            processed
          }
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
          path {
            alias
          }
        }
      }
    }
}  
`

export default Articles
