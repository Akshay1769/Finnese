import {
  Request,
  Response,
} from "express";

import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  publishBlog,
  deleteBlog,
} from "../services/blog.service";

export const createBlogController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const {
        title,
        content,
        category,
        image,
      } = req.body;

      const result =
        await createBlog({
          title,
          content,
          category,
          image,
          authorId:
            req.user!.userId,
        });

      res.status(201).json(
        result
      );
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    }
  };

export const getBlogsController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const result =
        await getBlogs();

      res.status(200).json(
        result
      );
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    }
  };

export const getBlogByIdController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const blogId =
        req.params.id as string;

      const result =
        await getBlogById(
          blogId
        );

      res.status(200).json(
        result
      );
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    }
  };

export const updateBlogController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const blogId =
        req.params.id as string;

      const result =
        await updateBlog(
          blogId,
          req.body
        );

      res.status(200).json(
        result
      );
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    }
  };

export const publishBlogController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const blogId =
        req.params.id as string;

      const result =
        await publishBlog(
          blogId
        );

      res.status(200).json(
        result
      );
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    }
  };

export const deleteBlogController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const blogId =
        req.params.id as string;

      const result =
        await deleteBlog(
          blogId
        );

      res.status(200).json(
        result
      );
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    }
  };