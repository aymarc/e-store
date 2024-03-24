import GroupModel from "./model.mjs";
import { ExistError, ErrorMessage } from "../../utils/error.mjs";
import { Op } from "sequelize";

export default class GroupService {

    //list group
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
            let group = await GroupModel.findAll(reqObj);

            return {
                success: true,
                data: group,
                message: null
            }
        } catch (error) {
            throw error;
        }
    }

    //create group
    async create(body) {
        try {
            let group = await GroupModel.findOne({
                where: {
                    name: body.name,
                },
                raw: true
            });
            if (group) {
                throw new ExistError("Group exist already exist");
            }
            group = await GroupModel.create(body);
            return {
                success: true,
                message: "group created successfully"
            }
        } catch (error) {
            throw error;
        }
    }



    //update group 
    async update(body, headers) {
        try {

            let group = await GroupModel.update(body, {
                where: {
                    id: body.id,
                },
                raw: true
            });
            if (!group[0]) {
                return {
                    success: false,
                    message: "group not found",
                }
            }
            group = await GroupModel.findByPk(body.id);
            return {
                success: true,
                message: "group data updated",
                data: group
            }
        } catch (error) {
            throw error;
        }
    }


    //delete group
    async remove(req) {
        try {
            const id = req?.body?.id || req?.params?.id || req?.query?.id
            let group = await GroupModel.findByPk(id);
            if (group) {
                await group.destroy();
            } else {
                throw new ErrorMessage("Oops! Something went wrong. Try again later.")
            }
        } catch (error) {
            throw error;
        }
    }
}