import SectionModel from "./model.mjs";
import { ExistError, ErrorMessage } from "../../utils/error.mjs";
import { Op } from "sequelize";

export default class SectionService {

    //list section
    async list(req) {
        try {
            const id = req?.body?.id || req?.params?.id || req?.query?.id
            const includeAll = req.body?.includeAll || req.query?.includeAll;

            const reqObj = { raw: true };
            const where = includeAll ? {} : { active: 1 }
            if (id) {
                where.id = id;
            }
            if (Object.keys(where).length) {
                reqObj.where = { [Op.and]: [where] }
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
    async create(body) {
        try {
            let section = await SectionModel.findOne({
                where: {
                    name: body.name,
                },
                raw: true
            });
            if (section) {
                throw new ExistError("Section exist already exist");
            }
            section = await SectionModel.create(body);
            return {
                success: true,
                message: "section created successfully"
            }
        } catch (error) {
            throw error;
        }
    }



    //update section 
    async update(body, headers) {
        try {

            let section = await SectionModel.update(body, {
                where: {
                    id: body.id,
                },
                raw: true
            });
            if (!section[0]) {
                return {
                    success: false,
                    message: "section not found",
                }
            }
            section = await SectionModel.findByPk(body.id);
            return {
                success: true,
                message: "section data updated",
                data: section
            }
        } catch (error) {
            throw error;
        }
    }


    //delete section
    async remove(req) {
        try {
            const id = req?.body?.id || req?.params?.id || req?.query?.id
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