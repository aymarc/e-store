import { Router } from "express";
import ProductService from "./modules/product/service.mjs";
import SectionService from "./modules/section/service.mjs";
import CategoryService from "./modules/category/service.mjs";
import GroupService from "./modules/group/service.mjs";

import config from "./config.mjs";
const router = Router();
const productService = new ProductService();
const categoryService = new CategoryService();
const sectionService = new SectionService();
const groupService = new GroupService();

const homePageCategory1 = "Mobile Home";
const homePageCategory2 = "Sanitary";


export default class Page {
    routes = null;

    constructor() {
        this.routes = router;
        this._category = null;
        (async () => {
            try {

                // Create a closure to initialize the `_category` property.
                const initializeCategory = async () => {
                    const req = { body: { includeAll: false } };
                    this._category = await categoryService.list(req);
                };

                // Call the closure to initialize the `_category` property.
                initializeCategory();

            } catch (error) {
                console.error("error ", error);
            }
        })();

    }

    async getProducts(filter) {
        try {
            const req = { homePage: { ...filter } }
            return await productService.list(req);
        } catch (error) {
            console.error(error);
        }
    }


    initRoutes() {



        this.routes.get("/admin/login",
            async (req, res, next) => {
                try {
                    res.render("login", { pageName: "Login", title: config.WEBSITE_TITLE })
                } catch (error) {
                    next(error);
                }
            });

        this.routes.get("/admin",
            async (req, res, next) => {
                try {

                    res.render("admin",
                        {
                            pageName: "Dashboard",
                            title: config.WEBSITE_TITLE,
                            activate: 1,
                            category: this._category?.data || [],
                        })
                } catch (error) {
                    next(error);
                }
            });

        this.routes.get("/admin/product",
            async (req, res, next) => {
                try {
                    const secReq = { body: { includeAll: false } };
                    const section = await sectionService.list(secReq);
                    const gpReq = { body: { includeAll: false } };
                    const group = await groupService.list(gpReq);
                    res.render("admin-product",
                        {
                            pageName: "Products - Dashboard",
                            title: config.WEBSITE_TITLE,
                            activate: 2,
                            category: this._category?.data || [],
                            section: section.data || [],
                            group: group?.data || [],
                        })
                } catch (error) {
                    next(error);
                }
            });
        this.routes.get("/admin/category",
            async (req, res, next) => {
                try {

                    res.render("admin-category",
                        {
                            pageName: "Category - Dashboard",
                            title: config.WEBSITE_TITLE,
                            activate: 3,
                            category: this._category?.data || [],
                        })
                } catch (error) {
                    next(error);
                }
            });
        this.routes.get("/admin/section",
            async (req, res, next) => {
                try {
                    const gpReq = { body: { includeAll: false } };
                    const group = await groupService.list(gpReq);
                    res.render("admin-section",
                        {
                            pageName: "Section - Dashboard",
                            title: config.WEBSITE_TITLE,
                            activate: 4,
                            category: this._category?.data || [],
                            group: group?.data || [],
                        })
                } catch (error) {
                    next(error);
                }
            });
        this.routes.get("/admin/order",
            async (req, res, next) => {
                try {
                    res.render("admin-menu",
                        {
                            pageName: "Order - Dashboard",
                            title: config.WEBSITE_TITLE,
                            activate: 5,
                            category: this._category?.data || [],
                        })
                } catch (error) {
                    next(error);
                }
            });
        this.routes.get("/admin/group",
            async (req, res, next) => {
                try {
                    res.render("admin-group",
                        {
                            pageName: "Group - Dashboard",
                            title: config.WEBSITE_TITLE,
                            activate: 6,
                            category: this._category?.data || [],
                        })
                } catch (error) {
                    next(error);
                }
            });

        this.routes.get("/",
            async (req, res, next) => {
                try {

                    const products = await productService.listHomePage(req);
                    await res.render("index",
                        {
                            pageName: "Início",
                            title: config.WEBSITE_TITLE,
                            curr: config.CURRENCY,
                            category: this._category?.data || [],
                            products: products?.data || [],
                        })
                } catch (error) {
                    next(error);
                }
            });

        this.routes.get("/product",
            async (req, res, next) => {
                try {
                    req.query.page = "product";
                    const product = await productService.list(req);

                    res.render("product",
                        {
                            pageName: "Produto",
                            title: config.WEBSITE_TITLE,
                            product: product?.data[0] || [],
                            category: this._category?.data || [],
                        })
                } catch (error) {
                    next(error);
                }
            });

        this.routes.get("/shop",
            async (req, res, next) => {
                try {
                    req.query.page = "shop";
                    const products = await productService.list(req);
                    res.render("shop",
                        {
                            pageName: "Loja",
                            title: config.WEBSITE_TITLE,
                            products: products?.data || [],
                            category: this._category?.data || [],
                        })
                } catch (error) {
                    next(error);
                }
            });

        this.routes.get("/cart",
            async (req, res, next) => {
                try {
                    res.render("cart",
                        {
                            pageName: "Carrinho",
                            title: config.WEBSITE_TITLE,
                            category: this._category?.data || [],
                        })
                } catch (error) {
                    next(error);
                }
            });

        this.routes.get("/checkout",
            async (req, res, next) => {
                try {
                    res.render("checkout",
                        {
                            pageName: "Finalizar a compra",
                            title: config.WEBSITE_TITLE,
                            category: this._category?.data || [],
                        })
                } catch (error) {
                    next(error);
                }
            });

        this.routes.get("/contact",
            async (req, res, next) => {
                try {
                    res.render("contact",
                        {
                            pageName: "Contacto",
                            title: config.WEBSITE_TITLE,
                            category: this._category?.data || [],
                        })
                } catch (error) {
                    next(error);
                }
            });

        this.routes.get("/about",
            async (req, res, next) => {
                try {
                    res.render("about",
                        {
                            pageName: "Sobre",
                            title: config.WEBSITE_TITLE,
                            category: this._category?.data || [],
                        })
                } catch (error) {
                    next(error);
                }
            });

        this.routes.get("*",
            async (req, res, next) => {
                try {
                    res.render("404", { pageName: "Not Found", title: config.WEBSITE_TITLE })
                } catch (error) {
                    next(error);
                }
            });

        return this.routes;
    }


}