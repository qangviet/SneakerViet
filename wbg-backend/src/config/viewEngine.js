const express = require("express");
const path = require("path");

const configviewEngine = (app) => {
    // const srcDir =  path.join(__dirname, '..');
    app.set("views", path.join("./src", "views"));
    app.set("view engine", "ejs");

    //Config static files
    app.use(express.static(path.join("./src", "public")));
};

export default configviewEngine;
