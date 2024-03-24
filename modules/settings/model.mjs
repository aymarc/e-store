import { DataTypes, Model } from "sequelize";
import db from "../../utils/db.mjs";



export default class SettingModel extends Model { }


SettingModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        banners: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        premium: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        categories: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        }
    },
    {
        timestamps: true,
        sequelize: db,
        tableName: "setting",
    });


