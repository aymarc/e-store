import Joi from "joi";

export default class SectionValidation {

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
            groupName: this.Joi.string().required().allow(null, ''),
        })
    }

    update() {
        return this.Joi.object({
            id: this.Joi.number().required(),
            name: this.Joi.string().optional().allow(null, ''),
            displayName: this.Joi.string().optional().allow(null, ''),
            groupName: this.Joi.string().optional().allow(null, ''),
            active: this.Joi.number().optional().allow(null, ''),
        })
    }

}