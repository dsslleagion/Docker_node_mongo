import { Router } from "express";
import { LoginController } from "../controllers";

const loginRouter = Router();

loginRouter.post("/login", LoginController.login);
loginRouter.get("/checkAuthentication", LoginController.checkAuthentication);
loginRouter.get("/logout", LoginController.logOut);

export default loginRouter;
