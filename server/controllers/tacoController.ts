/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable prefer-template */

import { type Request, type Response, type NextFunction } from 'express'
import { cleanRecipe } from './helperFunc'

const tacoController: any = {}

tacoController.current = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupId = req.params.groupId;
    const queryString = `SELECT`
    const values = [groupId];

    const result = await db.query(queryString, values)
  } catch (err) {
    next({
      log: 'failed in apiController.getRandomTaco.',
      status: 500,
      message: { err: `Error: ${err}}` }
    })
  }
}
tacoController.queryById = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    next({
      log: 'failed in apiController.getRandomTaco.',
      status: 500,
      message: { err: `Error: ${err}}` }
    })
  }
}

tacoController.getNewTaco = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const URL =
      'https://api.edamam.com/api/recipes/v2?type=public&app_id=31016b75&app_key=%20384727856a6a8711c7df9178ad185878&cuisineType=Mexican&imageSize=REGULAR&excluded=Crock%20Pot&excluded=crockpot&excluded=pasta&excluded=soups&excluded=filling&random=true&field=label&field=image&field=source&field=url&field=yield&field=dietLabels&field=ingredientLines&field=calories&field=totalTime&field=totalNutrients&tag=tacos'
    const data = await fetch(URL)
    const totalResults = await data.json()
    const resultCount = totalResults.count
    console.log('resultCount', resultCount)
    const randomId = Math.floor(Math.random() * resultCount)
    console.log('randomId', randomId)
    // save to database
    const tacoId = totalResults.hits[randomId].recipe.url
    console.log('tacoId', tacoId)
    res.locals.tacoRandomId = tacoId
    next()
  } catch (err) {
    next({
      log: 'failed in apiController.getRandomTaco.',
      status: 500,
      message: { err: `Error: ${err}}` }
    })
  }
}

tacoController.getTacoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = req.params.id
    const apiKey = ''
    const URL =
      'https://api2.bigoven.com/recipe/' + recipeId + '?api_key=' + apiKey
    // generate a randomTaco
    // save that taco to user
    const data = await fetch(URL)
    const tacoUnfiltered = await data.json()
    res.locals.taco = 0
  } catch (err) {
    next({
      log: 'failed in apiController.getRandomTaco.',
      status: 500,
      message: { err: `Error: ${err}}` }
    })
  }
}

export default tacoController
