import UserModel, { comparePassword, generateToken } from "./model.mjs";
import { ExistError, ErrorMessage, AuthenticationError } from "../../utils/error.mjs";
import Token from "../token/service.mjs";
import config from "../../config.mjs";
//import RedisStore from "../../utils/redis";

//const redisStore = new RedisStore();
const tokenService = new Token();

export default class UserService {

    //list user
    async list(req) {
        try {
            const id = req.body?.id || req.params?.id || req.query?.id
            const reqObj = { raw: true };
            if (id) {
                reqObj.where = {
                    id: id,
                }
            }
            let user = await UserModel.findAll(reqObj);

            return {
                success: true,
                data: user,
                message: "user created successfully"
            }
        } catch (error) {
            throw error;
        }
    }

    //create user
    async create(body) {
        try {
            let user = await UserModel.findOne({
                where: {
                    email: body.email,
                },
                raw: true
            });
            if (user) {
                throw new ExistError("Account already exist");
            }
            user = await UserModel.create(body);
            return {
                success: true,
                message: "user created successfully"
            }
        } catch (error) {
            throw error;
        }
    }



    //update user 
    async update(body, headers) {
        try {
            const id = headers.user.id;
            let user = await UserModel.update(body, {
                where: {
                    id: body.id || id,
                }
            });
            user = await UserModel.findByPk(body.id);
            return {
                success: true,
                message: "user data update",
                data: user
            }
        } catch (error) {
            throw error;
        }
    }


    //delete user
    async remove(headers) {
        try {
            let id = headers.user.id;
            let user = await UserModel.findByPk(id);
            if (user) {
                await user.destroy();
            } else {
                throw new ErrorMessage("Oops! Something went wrong. Try again later.")
            }
        } catch (error) {
            throw error;
        }
    }

    //user login
    async login(email_, password) {
        try {
            let user = await UserModel.findOne({
                where: { email: email_ },
                raw: true
            });
            if (!user) {
                throw new AuthenticationError("Incorrect username and or password");
            }
            let token = "";
            if (await comparePassword(password, user.password)) {
                token = await generateToken(user.id, user.name);
                const validity = parseInt(config.JWT_TOKEN_VALIDITY);
                // await redisStore.setExInRedis(token, validity, user.name);
                await tokenService.set(user.id, token);
            } else {
                throw new AuthenticationError("Incorrect username and or password");
            }

            return {
                success: true,
                message: "Login successfully",
                token
            }
        } catch (error) {
            throw error;
        }
    }

    //user logout
    async logout(headers) {
        try {
            const userId = headers.user?.id;
            // await redisStore.delInRedis(token);
            await tokenService.remove(userId);
            return {
                success: true,
                message: "Logout successfully",
            }
        } catch (error) {
            throw error;
        }
    }
}