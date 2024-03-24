import HomeAssetModel from "./HomeAssetModel.mjs";
import { ExistError, ErrorMessage } from "../../utils/error.mjs";
import ProductModel from "../product/model.mjs";

//import RedisStore from "../../utils/redis";

//const redisStore = new RedisStore();


export default class SettingService {

    async homeAssetList(req) {
        try {
            const id = req.body?.id || req.params?.id || req.query?.id
            const reqObj = { raw: true };
            if (id) {
                reqObj.where = {
                    id: id,
                }
            }
            let setting = await HomeAssetModel.findAll(reqObj, {
                include: [{
                    model: ProductModel,
                    as: 'productDetails'
                }]
            });

            return {
                success: true,
                data: setting,
                message: null
            }
        } catch (error) {
            throw error;
        }
    }

    //create setting
    async homeAssetCreate(body) {
        try {
            await HomeAssetModel.create(body);
            return {
                success: true,
                message: "setting created successfully"
            }
        } catch (error) {
            throw error;
        }
    }



    //update setting 
    async homeAssetUpdate(body, headers) {
        try {
            const id = req.body?.id || req.params?.id || req.query?.id
            let setting = await HomeAssetModel.update(body, {
                where: {
                    id: body.id || id,
                }
            });
            setting = await HomeAssetModel.findByPk(body.id);
            return {
                success: true,
                message: "setting data update",
                data: setting
            }
        } catch (error) {
            throw error;
        }
    }


    //delete setting
    async homeAssetRemove(req) {
        try {
            const id = req.body?.id || req.params?.id || req.query?.id
            const asset = await HomeAssetModel.findByPk(id);
            if (asset) {
                await asset.destroy();
            } else {
                throw new ErrorMessage("Oops! Something went wrong. Try again later.")
            }
        } catch (error) {
            throw error;
        }
    }




}