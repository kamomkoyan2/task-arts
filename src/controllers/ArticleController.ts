import { Request, Response } from 'express';

import Article from '../db/models/Article';
import helpers from '../helpers/Helper';
import isAuth from '../helpers/authUser';
import { paginate } from '../helpers/pagination';
const createArticle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, content } = req.body;

    const article = await Article.create({
      title: title,
      content: content,
      userId: isAuth(req)?.id,
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



const getAllArticles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const options = {
      page: req.query.page,
      pageSize: req.query.pageSize,
      sortBy: req.query.sortBy,
      sortDirection: req.query.sortDirection,
      filter: req.query.filter,
      search: req.query.search
    };
    // @ts-ignore
    const { count, rows } = await paginate(Article, options);

    return res.status(200).send(helpers.ResponseData(200, '', null, rows));
  } catch (error) {
    return res.status(400).send(helpers.ResponseData(400, '', error, null));
  }
};



const updateArticle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'content'];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res
        .status(500)
        .send(helpers.ResponseData(500, 'Invalid Updates', null, null));
    }

    const id = req.params.id;

    try {
      // @ts-ignore
      const article: Array = await Article.findByPk(id, {
        // @ts-ignore
        where: { id: isAuth(req)?.id },
      });
      if (article.userId !== isAuth(req)?.id) {
        return res
          .status(500)
          .send(
            helpers.ResponseData(
              500,
              `you can only update your own list, you haven't list with provided id - ${id}`,
              null,
              null
            )
          );
      }
      updates.forEach((update) => (article[update] = req.body[update]));
      await article.save();
      return res
        .status(201)
        .send(helpers.ResponseData(200, 'Updated', null, article));
    } catch (error) {
      return res
        .status(500)
        .send(helpers.ResponseData(500, 'Internal Server Error', error, null));
    }
  } catch (error: any) {
    return res
      .status(500)
      .send(helpers.ResponseData(500, 'Internal Server Error', error, null));
  }
};

const deleteArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.destroy({
      where: { id: req.params.id, userId: isAuth(req)?.id },
    }).then(function (deletedRecord: number) {
      if (deletedRecord === 1) {
        return res
          .status(201)
          .send(helpers.ResponseData(200, 'deleted successfully', null, null));
      }
    });

    if (!article) {
      return res
        .status(500)
        .send(helpers.ResponseData(500, 'Not Found', null, null));
    }
  } catch (error) {
    return res
      .status(500)
      .send(helpers.ResponseData(500, 'Internal Server Error', error, null));
  }
};

export default { createArticle, getAllArticles, updateArticle, deleteArticle };
