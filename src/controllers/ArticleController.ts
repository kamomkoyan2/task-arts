import { Request, Response } from 'express';

import Article from '../db/models/Article';
import helpers from '../helpers/Helper';
import authorization from '../middleware/authorization';

const createArticle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(' ')[1];
    const authUser = helpers.extractToken(token!);

    const { title, content } = req.body;

    const article = await Article.create({
      title: title,
      content: content,
      userId: authUser?.id,
    });
    return res
      .status(201)
      .send(helpers.ResponseData(201, 'Created', null, article));
  } catch (error: any) {
    return res
      .status(500)
      .send(helpers.ResponseData(500, 'Internal Server Error', error, null));
  }
};

// const getAllArticles = async(req: Request,res: Response): Promise<Response> => {
//     try {
//         const articles = await Article.findAll();
//         console.log(articles);
//     } catch(error) {
//         return res.status(400).send(helpers.ResponseData(400, '', error, null))
//     }
// }

export default { createArticle };
