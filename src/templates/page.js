import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Page = ({ pageContext }) => {
  const { page } = pageContext;
  return (
    <Layout>
      <Seo title={page.title} />
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{__html:page.body.processed}} />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default Page
