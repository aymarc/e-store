import TokenModel from "./model.mjs";
//import RedisStore from "../../utils/redis";

//const redisStore = new RedisStore();


export default class TokenService {
    //create user
    async set(userId_, token_) {
        try {
            let user = await TokenModel.findOne({
                where: {
                    token: userId_,
                },
                raw: true
            });

            if (user) {
                user = await TokenModel.update({ token: token_ }, {
                    where: {
                        id: user.id,
                    }
                });
                return true;
            }

            await TokenModel.create({ userId: userId_, token: token_ });
            return true;
        } catch (error) {
            throw error;
        }
    }



    //update user 
    async get(token_) {
        try {
            let user = await TokenModel.findOne({
                where: {
                    token: token_,
                },
                raw: true
            });
            return user;

        } catch (error) {
            throw error;
        }
    }


    //delete user
    async remove(userId) {
        try {
            let token = await TokenModel.destroy({
                where: {
                    userId: userId,
                },
                raw: true
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

}