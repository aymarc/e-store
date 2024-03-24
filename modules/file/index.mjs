import { Router } from "express";
import Utils from "../../utils/index.mjs";
import Service from "./service.mjs";
const utils = new Utils();


const router = Router();
const service = new Service();
export default class FileUploader {
    routes = null;

    constructor() {
        this.routes = router;
    }

    initRoutes() {

        this.routes.get("/asset",
            utils.auth,
            async (req, res, next) => {
                try {
                    res.status(201).json(await service.list(req));
                } catch (error) {
                    next(error);
                }
            });

        this.routes.post("/upload/single",
            utils.auth,
            utils.fileUploader.single("file"),
            utils.compressFile,
            async (req, res, next) => {
                try {

                    res.status(201).json(await service.create(req));
                } catch (error) {
                    next(error);
                }
            });
        this.routes.post("/upload",
            utils.auth,
            utils.fileUploader.array("files"),
            utils.compressFile,
            async (req, res, next) => {
                try {

                    res.status(201).json(await service.create(req));
                } catch (error) {
                    next(error);
                }
            });

        return this.routes;
    }


}