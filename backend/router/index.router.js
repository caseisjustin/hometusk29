import express from "express"
import usersRouter from "./router.users.js"
import profileUser from "./router.profile.js"
import rootDefault from "./default.router.js";


const router = express.Router()


router.use("/users", usersRouter)
router.use("/profile", profileUser)
router.use("/", rootDefault)

export default router;