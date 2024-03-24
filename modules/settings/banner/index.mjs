import { Router } from "express";
import Validation from "./validation.mjs";
import Service from "./service.mjs";
import Utils from "../../../utils/index.mjs";


const validation = new Validation();
const service = new Service();
const utils = new Utils();


const router = Router();

export default class Banner {
    routes = null;

    constructor() {
        this.routes = router;
    }

    initRoutes() {
        this.routes.get("/banner",
            utils.auth,
            utils.bodyValidator(validation.list()),
            async (req, res, next) => {
                try {
                    res.status(201).json(await service.list(req));
                } catch (error) {
                    next(error);
                }
            });
        this.routes.post("/banner",
            utils.auth,
            utils.fileUploader.single("file"),
            utils.compressFile,
            utils.bodyValidator(validation.create()),
            async (req, res, next) => {
                try {
                    res.status(201).json(await service.create(req));
                } catch (error) {
                    next(error);
                }
            });

        this.routes.delete("/banner",
            utils.auth,
            async (req, res, next) => {
                try {
                    res.status(204).json(await service.remove(req));
                } catch (error) {
                    next(error);
                }
            });

        this.routes.patch("/banner",
            utils.auth,
            utils.bodyValidator(validation.update()),
            utils.fileUploader.single("file"),
            utils.compressFile,
            async (req, res, next) => {
                try {
                    res.status(200).json(await service.update(req));
                } catch (error) {
                    next(error);
                }
            });



        return this.routes;
    }


}