import ProductModel from "./model.mjs";
import { Op } from "sequelize";
import { ExistError, ErrorMessage, ValidationError } from "../../utils/error.mjs";
import FileService from "../file/service.mjs";
import GroupModel from "../group/model.mjs";
import SectionModel from "../section/model.mjs";

const fileService = new FileService();

export default class ProductService {

    //list product
    async list(req) {
        try {
            const id = req.body?.id || req.params?.id || req.query?.id;
            const includeAll = req.body?.includeAll || req.query?.includeAll;
            const categoryName = req.body?.categoryName || req.query?.categoryName;
            const section = req.body?.section || req.query?.section;

            const page = req.page;
            const reqObj = {
                raw: true,
                order: [
                    ['updatedAt', 'DESC'],
                    ['id', 'DESC'],
                ],
            };

            const where = includeAll ? {} : { active: 1 }
            if (id) {
                where.id = id;
            }
            if (categoryName) {
                where.categoryName = categoryName;
            }
            if (section) {
                where.section = section;
            }
            if (Object.keys(where).length) {
                reqObj.where = where;
            }

            //console.log("req obj", JSON.stringify(reqObj));

            const product = await ProductModel.findAll(reqObj);

            return {
                success: true,
                data: product,
                message: null
            }
        } catch (error) {
            throw error;
        }
    }

    async listHomePage(req) {
        try {
            // Assuming GroupModel and SectionModel are Sequelize models
            const reqObj = { where: { active: 1 }, raw: true }
            // Fetch all groups from the database
            const allGroups = await GroupModel.findAll(reqObj);

            // Create an object to store the result
            const resultObject = [];

            // Iterate through each group
            for (const group of allGroups) {
                // Fetch all sections belonging to the current group
                const groupSections = await SectionModel.findAll({
                    where: { groupName: group.name },
                    raw: true,
                });

                // Create an array to store sections for the current group
                const groupSectionsArray = [];

                // Iterate through each section in the current group
                for (const section of groupSections) {
                    // Fetch a maximum of 8 products for the current section
                    const sectionProducts = await ProductModel.findAll({
                        where: { section: section.name },
                        limit: 8,
                        raw: true
                    });

                    // Add the section with its products to the array
                    groupSectionsArray.push({
                        ...section,
                        products: sectionProducts,
                    });
                }

                // Add the group with its sections to the result object
                resultObject.push({
                    ...group,
                    sections: groupSectionsArray,
                });
            }

            return {
                success: true,
                data: resultObject,
                message: null
            }
        } catch (error) {
            throw error;
        }
    }


    //create product
    async create(req) {
        try {
            const { body } = req;
            const images = req.fileUrls
            delete req.fileUrls;
            if (images) {
                for (let i = 0; i < Object.keys(images).length; i++) {
                    const key = Object.keys(images)[i];
                    req.fileUrl = images[key];

                    const fileUploaded = await fileService.create(req);

                    if (key === "main") {
                        body.imageMain = fileUploaded.data.assetUrl;
                    } else {
                        body[key] = fileUploaded.data.assetUrl;
                    }
                }
            }

            if (!body.imageMain) {
                throw new ValidationError("At least one image is required.")
            }

            const product = await ProductModel.create(body);
            return {
                success: true,
                message: "product created successfully",
                data: ""
            }
        } catch (error) {
            throw error;
        }
    }


    //updatev2 product
    async update2(req) {
        try {
            const { body } = req;
            const id = req.body?.id || req.params?.id || req.query?.id

            const images = req.fileUrls
            delete req.fileUrls;
            if (images) {
                for (let i = 0; i < Object.keys(images).length; i++) {
                    const key = Object.keys(images)[i];
                    req.fileUrl = images[key];

                    const fileUploaded = await fileService.create(req);

                    if (key === "main") {
                        body.imageMain = fileUploaded.data.assetUrl;
                    } else {
                        body[key] = fileUploaded.data.assetUrl;
                    }
                }
            }


            const product = await ProductModel.update(body, {
                where: {
                    id: id,
                }
            });
            return {
                success: true,
                message: "product updated successfully",
                data: product
            }
        } catch (error) {
            throw error;
        }
    }


    //update user 
    async update(body) {
        try {
            const id = req.body?.id || req.params?.id || req.query?.id
            let product = await ProductModel.update(body, {
                where: {
                    id: id,
                }
            });

            return {
                success: true,
                message: "product data updated",
                data: product
            }
        } catch (error) {
            throw error;
        }
    }


    //delete product
    async remove(req) {
        try {
            const id = req.body?.id || req.params?.id || req.query?.id
            let product = await ProductModel.findByPk(id);
            if (product) {
                await product.destroy();
            } else {
                throw new ErrorMessage("Oops! Something went wrong. Try again later.")
            }
            return { success: true, message: "Product deleted" }
        } catch (error) {
            throw error;
        }
    }

}