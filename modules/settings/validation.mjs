import Joi from "joi";

export default class UserValidation {

    constructor() {
        this.Joi = Joi
    }

    homeAssetList() {
        return this.Joi.object({
            id: this.Joi.number().optional(),
            premium: this.Joi.number().optional(),
            popular: this.Joi.number().optional(),
            active: this.Joi.number().optional(),
        })
    }

    homeAssetCreate() {
        return this.Joi.object({
            productId: this.Joi.number().required(),
            premium: this.Joi.number().optional(),
            popular: this.Joi.number().optional(),
            active: this.Joi.number().optional(),
        })
    }

    homeAssetUpdate() {
        return this.Joi.object({
            id: this.Joi.number().required(),
            premium: this.Joi.number().optional(),
            popular: this.Joi.number().optional(),
            active: this.Joi.number().optional(),
        })
    }
}