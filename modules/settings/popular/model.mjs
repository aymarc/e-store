import { DataTypes, Model } from "sequelize";
import db from "../../../utils/db.mjs";



export default class PopularModel extends Model { }


PopularModel.init(
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
    },
    {
        timestamps: true,
        sequelize: db,
        tableName: "popular",
    });


