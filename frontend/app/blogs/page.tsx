"use client";

import { useEffect, useState } from "react";
import { api } from "../../services/api";

interface Blog {
  _id: string;

  title: string;

  content: string;

  category: string;

  image?: string;

  isPublished: boolean;

  isActive: boolean;
}

export default function BlogsPage() {

  const [loading, setLoading] =
    useState(true);

  const [blogs, setBlogs] =
    useState<Blog[]>([]);

  const fetchBlogs = async () => {

    try {

      const response =
        await api.get(
          "/blogs"
        );

      setBlogs(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchBlogs();

  }, []);

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Blogs
      </h1>

      <div className="space-y-4">

        {blogs.map(
          (blog) => (

            <div
              key={blog._id}
              className="border p-4 rounded"
            >

              <h2 className="text-xl font-bold">
                {blog.title}
              </h2>

              <p>
                Category:
                {" "}
                {blog.category}
              </p>

              <p>
                Published:
                {" "}
                {
                  blog.isPublished
                    ? "Yes"
                    : "No"
                }
              </p>

              <p>
                Status:
                {" "}
                {
                  blog.isActive
                    ? "Active"
                    : "Inactive"
                }
                
              </p>

              {
                blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-60 object-cover rounded mt-3"
                  />
                )
              }

              <p className="mt-3">
                {blog.content}
              </p>

            </div>

          )
        )}

      </div>

    </div>
  );
}