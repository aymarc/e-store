import { Router } from "express";
import Validation from "./validation.mjs";
import Service from "./service.mjs";
import Utils from "../../utils/index.mjs";

const validation = new Validation();
const service = new Service();
const utils = new Utils();


const router = Router();

export default class Setting {
    routes = null;

    constructor() {
        this.routes = router;
    }

    initRoutes() {
        this.routes.get("/setting/homeAsset",
            utils.auth,
            utils.bodyValidator(validation.homeAssetList()),
            async (req, res, next) => {
                try {
                    res.status(201).json(await service.homeAssetList(req));
                } catch (error) {
                    next(error);
                }
            });
        this.routes.post("/setting/homeAsset",
            utils.bodyValidator(validation.homeAssetCreate()),
            async (req, res, next) => {
                try {
                    res.status(201).json(await service.homeAssetCreate(req.body));
                } catch (error) {
                    next(error);
                }
            });

        this.routes.delete("/setting/homeAsset",
            utils.auth,
            async (req, res, next) => {
                try {
                    res.status(204).json(await service.homeAssetRemove(req));
                } catch (error) {
                    next(error);
                }
            });

        this.routes.patch("/setting/homeAsset",
            utils.auth,
            utils.bodyValidator(validation.homeAssetUpdate()),
            async (req, res, next) => {
                try {
                    res.status(200).json(await service.homeAssetUpdate(req.body, req.headers));
                } catch (error) {
                    next(error);
                }
            });



        return this.routes;
    }


}