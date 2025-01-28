import { useParams } from "react-router-dom";
import { useGetSingleBlogQuery } from "../../redux/feathers/blogs/blogApi";
import { Skeleton } from "antd";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const { data: blog, isLoading } = useGetSingleBlogQuery(blogId);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };


  return (
    <div className="bg-gray-100 min-h-screen px-6 md:px-30 py-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {isLoading ? (
          <Skeleton.Image active className="w-full h-64 object-cover" />
        ) : (
          <img
            src={blog?.image}
            alt={blog?.title}
            className="w-full h-84 object-cover"
          />
        )}

        <div className="p-6 sm:p-8">
          {isLoading ? (
            <>
              <Skeleton
                active
                title={{ width: "60%" }}
                paragraph={{ rows: 2, width: ["100%", "80%"] }}
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {blog?.title}
              </h1>
              <p className="text-gray-500 text-sm mb-6">{formatDate(blog.date)}</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {blog?.description}
              </p>
              <button
                className="bg-[#001845] cursor-pointer !text-white px-6 py-2 rounded-lg hover:bg-[#003366] transition"
                onClick={() => window.history.back()}
              >
                Back to Blogs
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
