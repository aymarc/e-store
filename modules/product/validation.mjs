import Joi from "joi";

export default class UserValidation {

    constructor() {
        this.Joi = Joi
    }

    list() {
        return this.Joi.object({
            id: this.Joi.number().optional(),
            label: this.Joi.string().optional(),
            price: this.Joi.number().optional(),
            categoryName: this.Joi.optional(),
        })
    }

    create() {
        return this.Joi.object({
            label: this.Joi.string().required(),
            shortDescription: this.Joi.string().required(),
            longDescription: this.Joi.string().optional().allow(null, ''),
            price: this.Joi.number().optional(),
            quantity: this.Joi.number().optional(),
            category: this.Joi.number().optional(),
            categoryName: this.Joi.string().optional().allow(null, ''),
            rating: this.Joi.number().optional().allow(null, ''),
            section: this.Joi.string().optional().allow(null, ''),
            group: this.Joi.string().optional().allow(null, ''),
            imageMain: this.Joi.string().optional(),
            imageSecondary1: this.Joi.string().optional(),
            imageSecondary2: this.Joi.string().optional(),
            imageSecondary3: this.Joi.string().optional(),
            imageSecondary4: this.Joi.string().optional(),
            imageSecondary5: this.Joi.string().optional(),
            imageSecondary6: this.Joi.string().optional(),
            imageSecondary7: this.Joi.string().optional(),
            imageSecondary8: this.Joi.string().optional(),
            active: this.Joi.number().optional(),
        })
    }

    update() {
        return this.Joi.object({
            id: this.Joi.number().required(),
            label: this.Joi.string().optional().allow(null, ''),
            shortDescription: this.Joi.string().optional().allow(null, ''),
            longDescription: this.Joi.string().optional().allow(null, ''),
            price: this.Joi.number().optional().allow(null, '', 0),
            quantity: this.Joi.number().optional().allow(null, '', 0),
            category: this.Joi.number().optional().allow(null, ''),
            categoryName: this.Joi.string().optional().allow(null, ''),
            rating: this.Joi.number().optional().allow(null, ''),
            section: this.Joi.string().optional().allow(null, ''),
            group: this.Joi.string().optional().allow(null, ''),
            imageMain: this.Joi.string().optional(),
            imageSecondary1: this.Joi.string().optional(),
            imageSecondary2: this.Joi.string().optional(),
            imageSecondary3: this.Joi.string().optional(),
            imageSecondary4: this.Joi.string().optional(),
            imageSecondary5: this.Joi.string().optional(),
            imageSecondary6: this.Joi.string().optional(),
            imageSecondary7: this.Joi.string().optional(),
            imageSecondary8: this.Joi.string().optional(),
            active: this.Joi.number().optional().allow(null, ''),
        })
    }
}