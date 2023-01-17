import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../database";


interface UserAccountAttributes
{
  id?: number,
  firstName?: string | null,
  lastName?: string | null,
  userId?: number | null,
  phoneNumber?: number | null,
  image?: string | null,


  createdAt?: Date,
  updatedAt? : Date
}


export interface UserAccountInput extends Optional<UserAccountAttributes, 'id'>{ }
export interface UserAccountOutput extends Required<UserAccountAttributes>{ }


class UserAccount extends Model<UserAccountAttributes, UserAccountInput> implements UserAccountAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public userId!: number;
  public phoneNumber!:number;
  public image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}




UserAccount.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  phoneNumber: {
    type: DataTypes.NUMBER,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },

}, {
  timestamps: true,
  sequelize: sequelize,
  underscored: false
});



export default UserAccount;
