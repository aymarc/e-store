
import { DataTypes, Model } from "sequelize";
import db from "../../utils/db.mjs";


export default class TokenModel extends Model { }


TokenModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: true,
        sequelize: db,
        tableName: "token",
    });

