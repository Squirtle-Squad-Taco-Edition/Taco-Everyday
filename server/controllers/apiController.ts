import { Request, Response, NextFunction } from 'express';

const apiController: any = {}

apiController.getRandomTaco = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // generate a randomTaco
    // save that taco to user
    res.locals.taco = 0
  } catch (err) {
    return next({
      log: `failed in apiController.getRandomTaco.`,
      status: 500,
      message: { err: `Error: ${err}}` },
    });
  }
};

export default apiController;
