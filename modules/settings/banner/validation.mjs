import Joi from "joi";

export default class BannerValidation {

    constructor() {
        this.Joi = Joi
    }

    list() {
        return this.Joi.object({
            id: this.Joi.number().optional()
        })
    }

    create() {
        return this.Joi.object({
            text: this.Joi.string().optional(),
            active: this.Joi.number().optional()
        })
    }

    update() {
        return this.Joi.object({
            id: this.Joi.number().required(),
            text: this.Joi.string().optional(),
            active: this.Joi.number().optional(),
            url: this.Joi.string().optional(),
            assetId: this.Joi.number().optional(),
        })
    }
}