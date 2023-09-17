import express from "express";
//import {homedetail} from "../controller/user";
const { database } = require("../controller/user")
import { UserController } from '../controller/usercontroller'
import { Auth } from '../middleware/auth'
const userController = new UserController();
const router = express.Router();

router.post("/register", (req: any, res: any) => userController.register(req, res));

router.post("/login", (req: any, res: any) => userController.login(req, res));

router.post("/insert_task", (req: any, res: any, next: any) => Auth.authenticate(req, res, next), (req: any, res: any) => userController.insert_task(req, res));

router.post("/task_list", (req: any, res: any, next: any) => Auth.authenticate(req, res, next), (req: any, res: any) => userController.tasklist(req, res));

router.post("/completed_task", (req: any, res: any, next: any) => Auth.authenticate(req, res, next), (req: any, res: any) =>
  userController.completed_task(req, res))

router.post("/update_task", (req: any, res: any, next: any) => Auth.authenticate(req, res, next), (req: any, res: any) =>
  userController.update_task(req, res))

router.post("/delete_task", (req: any, res: any, next: any) => Auth.authenticate(req, res, next), (req: any, res: any) =>
  userController.delete_task(req, res))

router.post("/assign_task", (req: any, res: any, next: any) => Auth.authenticate(req, res, next), (req: any, res: any) =>
  userController.assign_task(req, res))

router.post("/temp_data", (req: any, res: any) => userController.temp_data(req, res))

export { router }