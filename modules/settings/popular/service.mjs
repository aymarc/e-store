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
            console.log("fileUploaded", fileUploaded)
            if (!fileUploaded.success) {
                throw new ErrorMessage("Oops! Something went wrong. Try again later.")
            }
            req.body.bannerUrl = fileUploaded.data.assetUrl;
            req.body.bannerAssetId = fileUploaded.data.id;


            const banner = await SectionModel.create(req.body);
            return {
                success: true,
                message: "Banner created successfully",
                data: banner
            }
        } catch (error) {
            throw error;
        }
    }



    //update section 
    async update(body, headers) {
        try {
            const id = req.body?.id || req.params?.id || req.query?.id
            let section = await SectionModel.update(body, {
                where: {
                    id: body.id || id,
                }
            });
            section = await SectionModel.findByPk(body.id);
            return {
                success: true,
                message: "section data update",
                data: section
            }
        } catch (error) {
            throw error;
        }
    }


    //delete section
    async remove(headers) {
        try {
            let id = headers.section.id;
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