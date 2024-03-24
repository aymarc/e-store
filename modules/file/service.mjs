import AssetModel from "./model.mjs"



export default class Asset {
    async list(req) {
        try {
            const id = req.body?.id || req.params?.id || req.query?.id
            const reqObj = { raw: true };
            if (id) {
                reqObj.where = {
                    id: id,
                }
            }
            let section = await AssetModel.findAll(reqObj);

            return {
                success: true,
                data: section,
                message: null
            }
        } catch (error) {

        }
    }

    async create(req) {
        try {
            let asset = null

            if (req.fileUrls) {
                asset = await AssetModel.bulkCreate(req.fileUrls);
            } else {
                asset = await AssetModel.create(req.fileUrl);
            }

            return { success: true, data: asset };
        } catch (error) {
            throw error;
        }
    }
}
