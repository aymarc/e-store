import { Router } from "express";
import Validation from "./validation.mjs";
import Service from "./service.mjs";
import Utils from "../../utils/index.mjs";

const validation = new Validation();
const service = new Service();
const utils = new Utils();


const router = Router();

export default class Product {
    routes = null;

    constructor() {
        this.routes = router;
    }

    initRoutes() {
        this.routes.get("/product",
            utils.auth,
            utils.bodyValidator(validation.list()),
            async (req, res, next) => {
                try {
                    res.status(200).json(await service.list(req));
                } catch (error) {
                    next(error);
                }
            });

        this.routes.get("/product/home",
            utils.auth,
            utils.bodyValidator(validation.list()),
            async (req, res, next) => {
                try {
                    res.status(200).json(await service.listHomePage(req));
                } catch (error) {
                    next(error);
                }
            });

        this.routes.post("/product",
            utils.auth,
            utils.fileUploader.fields(
                [
                    {
                        name: 'main',
                        maxCount: 1
                    },
                    {
                        name: 'imageSecondary',
                        maxCount: 8
                    }
                ]
            ),
            utils.compressFile,
            utils.bodyValidator(validation.create()),
            async (req, res, next) => {
                try {
                    res.status(201).json(await service.create(req));
                } catch (error) {
                    next(error);
                }
            });

        this.routes.patch("/product",
            utils.auth,
            utils.fileUploader.fields(
                [
                    {
                        name: 'main',
                        maxCount: 1
                    },
                    {
                        name: 'imageSecondary',
                        maxCount: 8
                    }
                ]
            ),
            utils.compressFile,
            utils.bodyValidator(validation.update()),
            async (req, res, next) => {
                try {
                    res.status(200).json(await service.update2(req));
                } catch (error) {
                    next(error);
                }
            });

        this.routes.delete("/product",
            utils.auth,
            async (req, res, next) => {
                try {
                    res.status(204).json(await service.remove(req));
                } catch (error) {
                    next(error);
                }
            });

        this.routes.patch("/product_old",
            utils.auth,
            utils.bodyValidator(validation.update()),
            async (req, res, next) => {
                try {
                    res.status(200).json(await service.update(req.body, req.headers));
                } catch (error) {
                    next(error);
                }
            });



        return this.routes;
    }


}