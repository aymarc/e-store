import { DataTypes, Model } from "sequelize";
import db from "../../utils/db.mjs";



export default class HomeAssetModel extends Model {
    static associate(models) {
        console.log("models", models)
        HomeAssetModel.belongsTo(models.ProductModel, {
            foreignKey: 'productId', // ForeignKey in HomeAssetModel pointing to ProductModel
            as: 'productDetails', // Alias for the association
            constraints: true
        });
    }
}


HomeAssetModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            default: 0,
        },

        premium: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        popular: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
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
        tableName: "home_asset_model",
    });


