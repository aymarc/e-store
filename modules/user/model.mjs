//import { hashSync, compare, genSalt, hash } from "bcryptjs";
import bcrypt from "bcrypt";
import { DataTypes, Model } from "sequelize";
import db from "../../utils/db.mjs";
import jwt from "jsonwebtoken";
import config from "../../config.mjs";


export default class UserModel extends Model { }

const salt = 10;

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        streetAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(val) {
                return this.setDataValue("password", bcrypt.hashSync(val, salt));
            }
        }
    },
    {
        timestamps: true,
        sequelize: db,
        tableName: "user",
    });



export const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const secret_key = config.APP_KEY;
const token_validity = config.JWT_TOKEN_VALIDITY;
export const generateToken = async (id, name) => {
    return jwt.sign({ id, name },
        secret_key,
        { expiresIn: '24h' }
    );
};