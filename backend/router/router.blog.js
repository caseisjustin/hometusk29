import express from "express";
import { createBlog, getBlog, updateBlog, deleteBlog } from "../controllers/controller.blog.js";

const router = express.Router()


router.post("/", createBlog)
router.get("/", getBlog)
router.put("/:id", updateBlog)
router.delete("/:id", deleteBlog)

export default router;