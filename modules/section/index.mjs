import { Router } from "express";
import Validation from "./validation.mjs";
import Service from "./service.mjs";
import Utils from "../../utils/index.mjs";

const validation = new Validation();
const service = new Service();
const utils = new Utils();


const router = Router();

export default class Section {
    routes = null;

    constructor() {
        this.routes = router;
    }

    initRoutes() {
        this.routes.get("/section",
            utils.auth,
            utils.bodyValidator(validation.list()),
            async (req, res, next) => {
                try {
                    res.status(200).json(await service.list(req));
                } catch (error) {
                    next(error);
                }
            });
        this.routes.post("/section",
            utils.bodyValidator(validation.create()),
            async (req, res, next) => {
                try {
                    res.status(201).json(await service.create(req.body));
                } catch (error) {
                    next(error);
                }
            });

        this.routes.delete("/section",
            utils.auth,
            async (req, res, next) => {
                try {
                    res.status(204).json(await service.remove(req));
                } catch (error) {
                    next(error);
                }
            });

        this.routes.patch("/section",
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