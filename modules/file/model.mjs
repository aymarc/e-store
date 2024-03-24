import { DataTypes, Model } from "sequelize";
import db from "../../utils/db.mjs";



export default class AssetModel extends Model { }

AssetModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        assetUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        originalAssetUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },

    },
    {
        timestamps: true,
        sequelize: db,
        tableName: "asset",
    });


