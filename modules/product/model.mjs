import { DataTypes, Model } from "sequelize";
import db from "../../utils/db.mjs";



export default class ProductModel extends Model { }


ProductModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        shortDescription: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        longDescription: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        section: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        group: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },

        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        imageMain: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        imageSecondary1: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        imageSecondary2: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        imageSecondary3: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        imageSecondary4: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        imageSecondary5: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        imageSecondary6: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        imageSecondary7: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        imageSecondary8: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
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
        tableName: "product",
    });


