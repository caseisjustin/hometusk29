import express from "express"
import { getUserProfile } from "../controllers/controller.user.profile.js"
import { rootDefault } from "../controllers/controller.default.page.js";
const router = express.Router()


router.get("/", rootDefault)





router.get("/username", getUserProfile)
router.get("/email", getUserProfile)

// router.get("/login", loginUser)

export default router;