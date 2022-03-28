
import express from 'express';
var router = express.Router();
import bd from "../DB/db";
import middleware from "../utils/middleware";

//user ROUTER
router.post("/users/signUp", function (req, res) {
    bd.signUp(req, res);
});

router.post("/users/Login", function (req, res) {
    bd.Login(req, res);
});

//task router
router.get("/task/getTasks", function (req, res) {
    bd.getTask(req, res);
});

router.get("/task/getTask/:Id", function (req, res) {
    bd.getTaskId(req, res);
});

router.post("/task/createTask", middleware.verifyToken, function (req, res) {
    bd.createTask(req, res);
});

router.put("/task/updateTask", middleware.verifyToken, function (req, res) {
    bd.updateTask(req, res);
});

router.delete("/task/deleteTask/:Id", middleware.verifyToken, function (req, res) {
    bd.deleteTask(req, res);
});

module.exports = router;