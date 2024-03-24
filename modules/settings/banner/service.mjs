import SectionModel from "./model.mjs";
import { ExistError, ErrorMessage } from "../../../utils/error.mjs";
import FileService from "../../file/service.mjs";

//import RedisStore from "../../utils/redis";

//const redisStore = new RedisStore();
const fileService = new FileService();

export default class BannerService {

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
            let section = await SectionModel.findAll(reqObj);

            return {
                success: true,
                data: section,
                message: null
            }
        } catch (error) {
            throw error;
        }
    }

    //create section
    async create(req) {
        try {
            const fileUploaded = await fileService.create(req);

            if (!fileUploaded.success) {
                throw new ErrorMessage("Oops! Something went wrong. Try again later.")
            }
            req.body.url = fileUploaded.data.assetUrl;
            req.body.assetId = fileUploaded.data.id;


            const section = await SectionModel.create(req.body);
            return {
                success: true,
                message: "Added successfully",
                data: section
            }
        } catch (error) {
            throw error;
        }
    }



    //update section 
    async update(req) {
        try {
            const id = req.body?.id || req.params?.id || req.query?.id
            let section = await SectionModel.update(req.body, {
                where: {
                    id: id,
                }
            });

            return {
                success: true,
                message: "data updated",
                data: section
            }
        } catch (error) {
            throw error;
        }
    }


    //delete section
    async remove(headers) {
        try {
            const id = req.body?.id || req.params?.id || req.query?.id
            let section = await SectionModel.findByPk(id);
            if (section) {
                await section.destroy();
            } else {
                throw new ErrorMessage("Oops! Something went wrong. Try again later.")
            }
        } catch (error) {
            throw error;
        }
    }




}