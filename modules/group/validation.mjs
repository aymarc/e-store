import Joi from "joi";

export default class GroupValidation {

    constructor() {
        this.Joi = Joi
    }

    list() {
        return this.Joi.object({
            id: this.Joi.number().optional(),
            name: this.Joi.string().optional(),
        })
    }

    create() {
        return this.Joi.object({
            name: this.Joi.string().required(),
            displayName: this.Joi.string().required(),
        })
    }

    update() {
        return this.Joi.object({
            id: this.Joi.number().required(),
            name: this.Joi.string().optional().allow(null, ''),
            displayName: this.Joi.string().optional().allow(null, ''),
            active: this.Joi.number().optional().allow(null, ''),
        })
    }

}