import { Card, Skeleton } from "antd";
import { useGetAllBlogQuery } from "../../redux/feathers/blogs/blogApi";
import { useNavigate } from "react-router-dom";
import { TBlog } from "../../types";

const BlogPage = () => {
  const { data: blogData, isLoading } = useGetAllBlogQuery(undefined);

  const navigate = useNavigate()

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };

  const handleReadMore = (id: string) => {
    navigate(`/blog/${id}`)
  };

  return (
    <div className="bg-[#F9F9FB] min-h-screen px-6 md:px-40 py-24">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Our Blog</h1>
          <p className="text-gray-600 mt-2">
            Stay updated with the latest trends, tips, and ideas from the world
            of stationery.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="shadow-md">
                <Skeleton.Image active className="h-48 w-full object-cover" />
                <Skeleton active title={{ width: "80%" }} paragraph={{ rows: 2 }} />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogData?.data?.map((blog: TBlog) => (
              <Card
                key={blog.id}
                cover={
                  <img
                    alt={blog.title}
                    src={blog.image}
                    className="h-48 w-full object-cover"
                  />
                }
                className="shadow-md hover:shadow-lg transition duration-300"
              >
                <h2 className="text-xl font-bold text-gray-800 truncate">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {formatDate(blog.date)}
                </p>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {blog.description}
                </p>
                <button
                  className="bg-[#001845] cursor-pointer !text-white px-6 py-2 rounded-lg hover:bg-[#003366] transition"
                  onClick={() => handleReadMore(blog._id)}
                >
                  Read More
                </button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
