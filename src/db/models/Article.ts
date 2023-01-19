import { DataTypes, Model, Optional, ForeignKey } from 'sequelize';
import sequelize from '../database';
import User from './User';
interface ArticleAttributes {
  id?: number;
  title?: string | null;
  content?: string | null;
  userId?: ForeignKey<number | null> | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArticleInput extends Optional<ArticleAttributes, 'id'> {}
export interface ArticleOutput extends Required<ArticleAttributes> {}

class Article
  extends Model<ArticleAttributes, ArticleInput>
  implements ArticleAttributes
{
  public id!: number;
  public name!: string;
  public content!: string;
  declare userId: ForeignKey<User['id']>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Article.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.BIGINT,
      references: {
        model: User,
        key: 'userId',
      },
    },
  },
  {
    timestamps: true,
    sequelize: sequelize,
    underscored: false,
    tableName: 'articles',
  }
);

export default Article;
