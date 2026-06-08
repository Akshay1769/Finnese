import Blog from "../models/blog.model";

interface CreateBlogData {
  title: string;
  content: string;
  category: string;
  image?: string;
  authorId: string;
}

interface UpdateBlogData {
  title?: string;
  content?: string;
  category?: string;
  image?: string;
}

export const createBlog = async (blogData: CreateBlogData ) => {

  const blog = await Blog.create(blogData);

  return {
    success: true,
    message:
      "Blog created successfully",
    data: blog,
  };
};

export const getBlogs =
  async () => {
    const blogs =
      await Blog.find({
        isActive: true,
        isPublished: true,
      })
        .populate(
          "authorId",
          "firstName email"
        )
        .sort({
          createdAt: -1,
        });

    return {
      success: true,
      count: blogs.length,
      data: blogs,
    };
  };

export const getBlogById =
  async (blogId: string) => {
    const blog =
      await Blog.findById(
        blogId
      ).populate(
        "authorId",
        "firstName email"
      );

    if (!blog) {
      throw new Error(
        "Blog not found"
      );
    }

    return {
      success: true,
      data: blog,
    };
  };

export const updateBlog = async (
  blogId: string,
  updateData: UpdateBlogData
) => {
  const blog =
    await Blog.findByIdAndUpdate(
      blogId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!blog) {
    throw new Error(
      "Blog not found"
    );
  }

  return {
    success: true,
    message:
      "Blog updated successfully",
    data: blog,
  };
};

export const publishBlog =
  async (blogId: string) => {
    const blog =
      await Blog.findByIdAndUpdate(
        blogId,
        {
          isPublished: true,
        },
        {
          new: true,
        }
      );

    if (!blog) {
      throw new Error(
        "Blog not found"
      );
    }

    return {
      success: true,
      message:
        "Blog published successfully",
      data: blog,
    };
  };

export const deleteBlog =
  async (blogId: string) => {
    const blog =
      await Blog.findByIdAndDelete(
        blogId
      );

    if (!blog) {
      throw new Error(
        "Blog not found"
      );
    }

    return {
      success: true,
      message:
        "Blog deleted successfully",
    };
  };