import { DataTypes, Model } from "sequelize";
import db from "../../utils/db.mjs";




export default class SectionModel extends Model { }



SectionModel.init(
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
        groupName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        groupId: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0
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
        tableName: "section",
    });

