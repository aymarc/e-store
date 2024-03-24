
/*packages*/
import jwt from "jsonwebtoken";
//import RedisStore from './redis';
import multer from 'multer';
import path, { resolve } from 'path';
import { existsSync, unlink, unlinkSync } from 'fs';
import Jimp from 'jimp';
//import sharp from 'sharp';

/*other scripts*/
import Token from "../modules/token/service.mjs";
import { ErrorMessage, ValidationError, AuthenticationError } from "./error.mjs";
import config from "../config.mjs";

/**
 * validation functions to validate respectively
 * body, params, and query for a given request. 
 * Expecting a Joi.Schema using joi package. Returns an error
 * if validation fails. If not run the next process in the middleware
 * chain.
 * 
 * Auth function to check for authentication token. Also checks for session 
 * and determine whether user has an active session or not using Redis Store
 */


const tokenService = new Token();


// Create a settings for multer
let uploadStorage = multer.diskStorage({
    destination: (req, file, done) => {

        if (!file) {
            return done(new Error('Upload file error'), null);
        }

        const fileExits = existsSync(resolve(process.cwd(), `${config.UPLOAD_DIRECTORY}/${file.originalname}`))
        if (!fileExits) {
            return done(null, resolve(process.cwd(), config.UPLOAD_DIRECTORY));
        }

        unlink(resolve(process.cwd(), `${config.UPLOAD_DIRECTORY}/${file.originalname}`), (error) => {
            if (error) {
                return done(error);
            }
            return done(null, resolve(process.cwd(), `${config.UPLOAD_DIRECTORY}`))
        })
    },

    filename: (req, file, done) => {
        if (file) {
            const extFile = file.originalname.replace('.', '');
            const extPattern = /(jpg|jpeg|png|gif|svg)/gi.test(extFile);
            if (!extPattern) return done(new TypeError('File format is not valid'), null);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const newFileName = uniqueSuffix + '-' + file.originalname;
            return done(null, newFileName);
        }
    }
})

if (config.MULTER_STORAGE_TYPE === "2") {
    uploadStorage = multer.memoryStorage();
}

export default class Utils {
    construtor() {
        this.compressFile.bind(this);
    }
    fileUploader = multer({ storage: uploadStorage, limits: 1000000 });

    bodyValidator(schemaName) {
        if (!schemaName) {
            throw new ErrorMessage("No schema suplied to validator");
        }

        return async (req, res, next) => {
            try {
                const { error } = schemaName.validate(req.body);
                if (error) {
                    throw new ValidationError(error.details[0].message);
                }

                next();
            } catch (err) {
                console.error("catch error ", err);
                next(err);
            }
        }
    }

    async processFile(path, i) {
        const timestamp = new Date().toISOString().replace(/:/g, '_') + i + '_' + Math.round(Math.random() * 1E9);
        const newFilePath = `/${timestamp}.webp`.toString();

        const image = await Jimp.read(path);
        image.quality(80); // Adjust image quality (0-100)
        await image.writeAsync(`uploads${newFilePath}`);

        unlinkSync(path, (error) => {
            if (error) {
                console.error(error);
            }
        })
        return newFilePath;
    }
    compressFile = async (req, res, next) => {
        try {

            if (!req.file && !req.files) {
                return;
            }

            let allFiles = [], fileUrls = {};
            if (req.files) {
                allFiles = req.files;
            } else {
                allFiles = [req.file];
            }

            const fields = Object.keys(allFiles);
            for (let i = 0; i < fields.length; i++) {
                let originalname = "", path = "", fieldname = "", newFilePath = "", main = {}, secondary = {};

                if (fields[i] === "main") {
                    originalname = allFiles.main[0]?.originalname;
                    path = allFiles.main[0]?.path;
                    newFilePath = await this.processFile(path, i);
                    fileUrls["main"] = { assetUrl: newFilePath, originalAssetUrl: originalname };

                } else if (fields[i] === "imageSecondary") {
                    for (const [key, sec] of allFiles["imageSecondary"].entries()) {
                        originalname = sec["originalname"];
                        path = sec["path"];
                        fieldname = sec["fieldname"];
                        newFilePath = await this.processFile(path, i);
                        fileUrls[`imageSecondary${key + 1}`] = { assetUrl: newFilePath, originalAssetUrl: originalname };
                    }
                }

            }

            if (Object.keys(fileUrls).length > 0) {
                req.fileUrls = fileUrls
            }

            next();
        } catch (err) {
            console.error('Error:', err);
            return next(err);
        }
    }

    paramValidator(schemaName) {
        if (!schemaName) {
            throw new ErrorMessage("No schema suplied to validator");
        }

        return async (req, res, next) => {
            try {
                const { error } = await schemaName.validate(req.params);
                if (error) {
                    throw new ValidationError(error.details[0].message);
                }

                next();
            } catch (err) {
                console.error("catch error ", err);
                next(err);
            }
        }
    }

    queryValidator(schemaName) {
        if (!schemaName) {
            throw new ErrorMessage("No schema suplied to validator");
        }
        return async (req, res, next) => {
            try {
                const { error } = schemaName.validate(req.query);
                if (error) {
                    throw new ValidationError(error.details[0].message);
                }

                next();
            } catch (err) {
                console.error("catch error ", err);
                next(err);
            }
        }
    }

    async auth(req, res, next) {

        try {
            let authHeader = req.body.token || req.query.token || req.headers.authorization;

            let token = "";

            //check authorization token. If none throw Authentication exception
            if (!authHeader) {
                console.error("\n Auth Error: 'No access token supplied.'");
                throw new AuthenticationError("Kindly Login to proceed.");
            }

            //retrieve token from bearer token
            if (typeof authHeader !== undefined) {
                token = authHeader.split(' ')[1];
            }

            //decode token and verify if valid
            const secret_key = config.APP_KEY;
            let decoded = "";
            let isNotDecoded = false;
            jwt.verify(token, secret_key, (err, data) => {
                if (err) {
                    isNotDecoded = true;
                }
                decoded = data;
            });

            if (isNotDecoded) {
                throw new AuthenticationError("Kindly Login to proceed.");
            }
            //if token valid, check if token has a valid session. If not throw Authentication exception

            let activeSessionOwner = await tokenService.get(token) //await redisStore.getInRedis(token);

            if (!activeSessionOwner) {
                throw new AuthenticationError("Kindly Login to proceed.");
            };

            //if session exist verify ownwer's name is retrieve successfully. If not throw Authentication exception
            if (activeSessionOwner.userId !== decoded.id) {
                throw new AuthenticationError("Kindly Login to proceed.");
            }
            req.headers.user = decoded;

        } catch (err) {
            return next(err);
        }
        return next();
    };



}