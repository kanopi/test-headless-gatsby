import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Recipe = ({ pageContext }) => {
  const { recipe } = pageContext;
  return (<Layout>
    <Seo title={recipe.title} />
    <h1>
        {recipe.relationships.field_recipe_category[0].name} / {recipe.title}
    </h1>

    <div className="recipe-tags">
        {recipe.relationships.field_tags.map((tag) => <span className="recipe-tag">{tag.name}</span>)}
    </div>
    
    <p>
        Difficulty: {recipe.field_difficulty.toUpperCase()}
    </p>

    <p>
        Cooking Time: {recipe.field_cooking_time} Min(s)
    </p>
    
    <p>
        Number of Servings: {recipe.field_number_of_servings}
    </p>

    <div dangerouslySetInnerHTML={{__html:recipe.field_summary.processed}} />

    <img src={recipe.relationships.field_media_image.relationships.field_media_image.localFile.publicURL} alt="" className="" />

    <h2>Ingredients</h2>

    <ul>{recipe.field_ingredients.map((item) => (<li>{item}</li>))}</ul>

    <h2>Instructions</h2>
    <div dangerouslySetInnerHTML={{__html:recipe.field_recipe_instruction.processed}} />

    <p>Created by: {recipe.relationships.uid.display_name}</p>
    <p>Created on: {recipe.created}</p>
    <p>Last Updated: {recipe.revision_timestamp}</p>

    <Link to="/recipes">Back to Recipes</Link>
  </Layout>);
}

export default Recipe
