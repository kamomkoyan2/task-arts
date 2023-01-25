import { Model, FindOptions, Op } from "sequelize";


interface PaginationOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  filter?: any;
  search?: string;
}


export const paginate = async <T extends {}>(
  model: Model<T, any>,
  options: PaginationOptions = {}
): Promise<{ count: number; rows: T[] }> => {
  let {
    page = 1,
    pageSize = 10,
    sortBy = 'createdAt',
    sortDirection = 'desc',
    filter = {},
    search = ''
  } = options;

  // @ts-ignore
  const count = await model.count({ where: filter });
  const maxPage = Math.ceil(count / pageSize);
  page = Math.max(page, 1);
  page = Math.min(page, maxPage);

  const findOptions: FindOptions = {
    where: {
      ...filter,
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } }
      ]
    },
    offset: pageSize * (page - 1),
    limit: pageSize,
    order: [[sortBy, sortDirection]]
  };

  // @ts-ignore
  const rows = await model.findAll(findOptions);

  return { count, rows };
};
