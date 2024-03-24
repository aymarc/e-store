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
            bannerText: this.Joi.string().optional(),
        })
    }

    update() {
        return this.Joi.object({
            id: this.Joi.number().required(),
            bannerText: this.Joi.string().optional(),
        })
    }
}