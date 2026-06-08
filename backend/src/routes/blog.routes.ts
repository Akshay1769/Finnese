import express from "express";

import {
  createBlogController,
  getBlogsController,
  getBlogByIdController,
  updateBlogController,
  publishBlogController,
  deleteBlogController,
} from "../controllers/blog.controller";

import { authenticate }
from "../middleware/auth.middleware";

import { authorize }
from "../middleware/role.middleware";

const router =
  express.Router();

router.get(
  "/",
  getBlogsController
);

router.get(
  "/:id",
  getBlogByIdController
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  createBlogController
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  updateBlogController
);

router.patch(
  "/:id/publish",
  authenticate,
  authorize("admin"),
  publishBlogController
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteBlogController
);

export default router;