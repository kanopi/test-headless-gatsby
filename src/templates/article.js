import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Article = ({ pageContext }) => {
  const { article } = pageContext;
  return (
    <Layout>
      <Seo title={article.title} />
      <h1>{article.title}</h1>

      <p>Created {article.created} by {article.relationships.uid.display_name}</p>

      <img
        src={article.relationships.field_media_image.relationships.field_media_image.localFile.publicURL}
        alt={article.relationships.field_media_image.field_media_image.alt}
      />

      <div dangerouslySetInnerHTML={{__html:article.body.processed}} />

      <div className="tags">{article.relationships.field_tags.map((tag) => (<span className="tag">{tag.name}</span>))}</div>

      <Link to="/articles">Back to Articles</Link>
    </Layout>
  )
}

export default Article
