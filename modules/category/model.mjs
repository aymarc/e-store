//import { hashSync, compare, genSalt, hash } from "bcryptjs";
import bcrypt from "bcrypt";
import { DataTypes, Model } from "sequelize";
import db from "../../utils/db.mjs";




export default class CategoryModel extends Model { }



CategoryModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        }
    },
    {
        timestamps: true,
        sequelize: db,
        tableName: "category",
    });

