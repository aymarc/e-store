import { Op } from "sequelize";
import CategoryModel from "./model.mjs";
import { ExistError, ErrorMessage } from "../../utils/error.mjs";


export default class CategoryService {

    //list category
    async list(req) {
        try {
            const id = req?.body?.id || req?.params?.id || req?.query?.id
            const includeAll = req?.body?.includeAll || req?.query?.includeAll;

            const reqObj = { raw: true };
            const where = includeAll ? {} : { active: 1 }
            if (id) {
                where.id = id;
            }
            if (Object.keys(where).length) {
                reqObj.where = { [Op.and]: [where] }
            }

            let category = await CategoryModel.findAll(reqObj);

            return {
                success: true,
                data: category,
                message: null
            }
        } catch (error) {
            throw error;
        }
    }

    //create category
    async create(body) {
        try {
            let category = await CategoryModel.findOne({
                where: {
                    name: body.name,
                },
                raw: true
            });
            if (category) {
                throw new ExistError("Category exist already exist");
            }
            category = await CategoryModel.create(body);
            return {
                success: true,
                message: "category created successfully"
            }
        } catch (error) {
            throw error;
        }
    }



    //update category 
    async update(body, headers) {
        try {

            let category = await CategoryModel.update(body, {
                where: {
                    id: body.id,
                },
                raw: true
            });
            if (!category[0]) {
                return {
                    success: false,
                    message: "category not found",
                }
            }
            category = await CategoryModel.findByPk(body.id);
            return {
                success: true,
                message: "category data updated",
                data: category
            }
        } catch (error) {
            throw error;
        }
    }


    //delete category
    async remove(req) {
        try {
            const id = req?.body?.id || req?.params?.id || req?.query?.id
            let category = await CategoryModel.findByPk(id);
            if (category) {
                await category.destroy();
            } else {
                throw new ErrorMessage("Oops! Something went wrong. Try again later.")
            }
        } catch (error) {
            throw error;
        }
    }
}