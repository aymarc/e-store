import User from "./modules/user/index.mjs";
import Category from "./modules/category/index.mjs";
import Section from "./modules/section/index.mjs";
import Group from "./modules/group/index.mjs";
import Product from "./modules/product/index.mjs";
import Banner from "./modules/settings/banner/index.mjs";
import Page from "./page.mjs";
import FileUploader from "./modules/file/index.mjs";
import Settings from "./modules/settings/index.mjs";

//const apiVersion = `/api/v1`;

export default (app, apiVersion) => {
    const user = new User();
    const category = new Category();
    const group = new Group();
    const section = new Section();
    const product = new Product();
    const fileUploader = new FileUploader();
    const banner = new Banner();
    const page = new Page();
    const settings = new Settings();

    console.log("apiVersion ", apiVersion);
    app.use(apiVersion, user.initRoutes());
    app.use(apiVersion, category.initRoutes());
    app.use(apiVersion, section.initRoutes());
    app.use(apiVersion, group.initRoutes());
    app.use(apiVersion, product.initRoutes());
    app.use(apiVersion, fileUploader.initRoutes());
    app.use(apiVersion, banner.initRoutes());
    app.use(apiVersion, settings.initRoutes());

    //always keep page in last position
    app.use("", page.initRoutes());

}
