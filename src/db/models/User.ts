import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import Article from './Article';
interface UserAttributes {
  id?: number;
  email?: string | null;
  password?: string | null;
  accessToken?: string | null;
  verified?: boolean | null;
  active?: boolean | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public accessToken!: string;
  public verified!: boolean;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: sequelize,
    underscored: false,
    tableName: 'users',
  }
);

User.hasMany(Article, {
  onDelete: 'CASCADE',
});
export default User;
