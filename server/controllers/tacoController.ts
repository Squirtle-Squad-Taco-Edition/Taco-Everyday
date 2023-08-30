/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-template */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { type Request, type Response, type NextFunction } from 'express'
import { cleanRecipe, getTime } from './helperFunc'

const db = require('../model/tacoModel')

const tacoController: any = {}

// query database for current taco url
tacoController.current = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupId = Number(req.params.groupId)
    // find the id of the latest recipe
    const queryRecipeId =
      'SELECT tacos.taco_url FROM tacos JOIN taco_group ON tacos.recipe_id = taco_group.recipe_id WHERE taco_group.group_id = $1 AND tacos.recipe_id = (SELECT MAX(recipe_id) FROM tacos)'
    const lastRecipeId = await db.query(queryRecipeId, [groupId])
    if (lastRecipeId.rows.length === 0) {
      res.locals.fetchNewTaco = true
    }
    res.locals.currentLink = lastRecipeId.rows[0].taco_url
    next()
  } catch (err) {
    next({
      log: 'failed in apiController.getRandomTaco.',
      status: 500,
      message: { err: `Error: ${err}}` }
    })
  }
}

// query the recipe API for taco by url
tacoController.queryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ex "https://api.edamam.com/api/recipes/v2/011c531057503eb1cdf472ceb2ce0de4?type=public&app_id=31016b75&app_key=%20384727856a6a8711c7df9178ad185878"
    const { currentLink } = res.locals
    const APIRequest =
      currentLink +
      '&cuisineType=Mexican&imageSize=REGULAR&excluded=Crock%20Pot&excluded=crockpot&excluded=pasta&excluded=soups&excluded=seasoning&filling&random=true&field=label&field=image&field=source&field=url&field=yield&field=dietLabels&field=ingredientLines&field=calories&field=totalTime&field=totalNutrients&tag=tacos'

    const response = await fetch(APIRequest)
    const jsonResponse: any = await response.json()
    const filtered = cleanRecipe(jsonResponse)

    res.locals.recipe = filtered
    next()
  } catch (err) {
    next({
      log: 'failed in apiController.getRandomTaco.',
      status: 500,
      message: { err: `Error: ${err}}` }
    })
  }
}

// call to the recipe API and associated database queries
tacoController.getNewTaco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupId = Number(req.params.groupId)

    // initial recipe API fetch and random number calculation
    const URL =
      'https://api.edamam.com/api/recipes/v2?type=public&app_id=31016b75&app_key=%20384727856a6a8711c7df9178ad185878&cuisineType=Mexican&imageSize=REGULAR&excluded=seasoning&Crock%20Pot&excluded=crockpot&excluded=pasta&excluded=soups&excluded=filling&random=true&field=label&field=image&field=source&field=url&field=yield&field=dietLabels&field=ingredientLines&field=calories&field=totalTime&field=totalNutrients&tag=tacos'
    const data = await fetch(URL)
    const totalResults: any = await data.json()
    const resultCount = totalResults.hits.length
    const randomId: number = Math.floor(Math.random() * resultCount)

    // check database to see if link exists in the current group
    async function checkdatabase (id: any): Promise<any> {
      const queryStr = `SELECT tacos.taco_url
      FROM tacos
      JOIN taco_group
      ON tacos.recipe_id = taco_group.recipe_id
      WHERE taco_group.group_id = $1`

      const values = [groupId]
      const result = await db.query(queryStr, values)

      const {
        _links: {
          self: { href }
        }
      } = totalResults.hits[0]
      // if the url is not found on the database, return that obj
      if (!result.rows.includes(href)) {
        return totalResults.hits[id]
      }
      // else, grab a new link and check (recursively)
      console.log('had to recursively call checkdatabase!')
      return checkdatabase(Math.floor(Math.random() * resultCount))
    }
    const uniqueTaco = await checkdatabase(randomId)
    const filtered = cleanRecipe(uniqueTaco)

    // save the link and current time to database
    const { link } = filtered
    const currentTime = getTime()
    const saveQuery =
      'INSERT INTO tacos (taco_url, created_at) VALUES ($1, $2) RETURNING recipe_id'
    const tacoSaveQuery = await db.query(saveQuery, [link, currentTime])

    const currentId = tacoSaveQuery.rows[0].recipe_id

    // associate that recipe with the current group
    const tacoGroupQuery =
      'INSERT INTO taco_group (recipe_id, group_id) VALUES ($1, $2)'
    const tacoGroupRequest = await db.query(tacoGroupQuery, [
      currentId,
      groupId
    ])

    res.locals.recipe = filtered
    next()
  } catch (err) {
    next({
      log: 'failed in apiController.getRandomTaco.',
      status: 500,
      message: { err: `Error: ${err}}` }
    })
  }
}

export default tacoController
