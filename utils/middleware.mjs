import express, { json, urlencoded, raw } from "express";
import cors from "cors";

export default class Middleware {
    app = null;
    env = null;
    apiVersion = null;
    constructor(app, env, apiVersion) {
        this.app = app;
        this.apiVersion = apiVersion;
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(raw());
        this.app.use(cors());
        this.env = env;

    }

    initializeRoute(routeName) {
        this.app.use(this.apiVersion, routeName);
    }

    useAsStatic(dir) {
        this.app.use(express.static(dir || 'public'));
    }

    initializeView(engine) {
        this.app.set("view engine", engine || "ejs");
    }

    report() {
        if (this.env === "development") {
            this.app.use((req, res, next) => {
                const requestObject = {
                    AuthToken: req.headers.authorization,
                    Url: `${req.get("HOST")}${req.originalUrl}`,
                    Method: req.method,
                    Body: req.body,
                    Params: req.params,
                    Query: req.query,
                }
                console.info("============START====================\n");
                console.time("request-duration");
                console.info(requestObject);
                console.timeEnd("request-duration");
                console.info("============START====================\n");
                next();
            })

        }
    }

    catchError() {
        this.app.use((err, req, res, next) => {
            if (!err) {
                return next();
            }
            console.error("==================Error Start=========\n", err,
                "==================Error End==========\n\n");
            const message = err.httpStatusCode
                ? { success: false, ErrorMessage: err.message } : {
                    success: false,
                    ErrorMessage: "Oops! We are so sorry; something went wrong. Kindly contact support if this persist."
                };
            res.status(err.httpStatusCode || 500).json(message);
        })
    }

    catchRequestWithNoMatch() {
        this.app.use((req, res, next) => {
            res.status(404).json({
                message: `Requested route ( ${req.get('HOST')}${req.originalUrl} ) not found`,
            });
        })
    }
}