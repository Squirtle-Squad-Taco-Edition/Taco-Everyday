/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-len */

export function cleanRecipe (obj: any) {
  const newObj: any = {}
  newObj.label = obj.recipe.label
  newObj.description = obj.recipe.ingredientLines
  newObj.url = obj.recipe.url
  newObj.imageurl = obj.recipe.image
  newObj.calories = obj.recipe.calories
  newObj.totalNutrients = {
    carbs: obj.recipe.totalNutrients.CHOCDF,
    fat: obj.recipe.totalNutrients.FAT,
    protein: obj.recipe.totalNutrients.PROCNT
  }
  newObj.totalTime = obj.recipe.totalTime
  newObj.servings = obj.recipe.yield
  return newObj
}

export function getTime () {
  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()

  const amOrPm = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12

  const formattedDateTime = `${month}/${day}/${year}, ${formattedHours}:${minutes}:${seconds}.${milliseconds} ${amOrPm}`
  return formattedDateTime
}
