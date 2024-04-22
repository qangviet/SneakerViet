//Method render
import express from "express";
import homeController from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.getHome);

    return app.use("/", router);
};

export default initWebRoutes;
