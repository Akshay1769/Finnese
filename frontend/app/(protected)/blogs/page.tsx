"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import LogoAnimation from "@/components/pageloader"

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
    
    return <div className ="min-h-screen flex items-center justify-center"> <LogoAnimation/></div>
  }

  return (
  <div className="min-h-screen max-w-7xl mx-auto px-6 py-8">

    <div className="mb-10">

      <h1 className="text-4xl font-black text-white">
        Financial Blogs
      </h1>

      <p className="text-white/50 mt-2">
        Learn investing, portfolio management, risk assessment and wealth building.
      </p>

    </div>

    {blogs.length === 0 ? (

      <div className="bg-gray-900/80 border border-white/10 rounded-3xl p-12 text-center">

        <h2 className="text-2xl font-bold text-white">
          No Blogs Available
        </h2>

        <p className="text-white/50 mt-3">
          New articles and educational content will appear here.
        </p>

      </div>

    ) : (

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {blogs.map((blog) => (

          <div
            key={blog._id}
            className="bg-gray-900/80 border border-white/10 rounded-3xl overflow-hidden hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/10 hover:scale-[1.01] transition-all duration-300"
          >

            {blog.image ? (

              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover"
              />

            ) : (

              <div className="h-64 bg-gradient-to-br from-gray-800 to-gray-950 flex items-center justify-center">

                <h3 className="text-2xl font-bold text-white/30">
                  FINNESE
                </h3>

              </div>

            )}

            <div className="p-6">

              <div className="flex items-center justify-between mb-4">

                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium">
                  {blog.category}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    blog.isPublished
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {blog.isPublished ? "Published" : "Draft"}
                </span>

              </div>

              <h2 className="text-2xl font-bold text-white mb-4">
                {blog.title}
              </h2>

              <p className="text-white/60 leading-relaxed line-clamp-4">
                {blog.content}
              </p>

              <div className="mt-6 flex items-center justify-between">

                <span
                  className={`text-sm font-medium ${
                    blog.isActive
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {blog.isActive ? "Active" : "Inactive"}
                </span>

                <button className="bg-amber-400 text-black px-5 py-2 rounded-xl font-semibold hover:bg-amber-300 transition-all duration-300">
                  Read More
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
);
}