import { DataTypes, Model } from "sequelize";
import db from "../../../utils/db.mjs";



export default class BannerModel extends Model { }


BannerModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        url: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        assetId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            default: 0,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
    },
    {
        timestamps: true,
        sequelize: db,
        tableName: "banner",
    });


