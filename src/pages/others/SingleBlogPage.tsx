
const SingleBlogPage = () => {
  const blog = {
    "id": 6,
    "title": "DIY Classroom Decoration Ideas",
    "description": "Get inspired with creative DIY decoration ideas to transform your classroom into a vibrant learning space.",
    "image": "https://i.ibb.co.com/qL6Rbrr/photo-1577896851231-70ef18881754.jpg",
    "date": "December 30, 2024"
  }

  return (
    <div className="bg-gray-100 min-h-screen px-6 md:px-30 py-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-1/2 object-cover"
        />

        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          <p className="text-gray-500 text-sm mb-6">{blog.date}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{blog.description}</p>
          <button
             className="bg-[#001845] cursor-pointer !text-white px-6 py-2 rounded-lg hover:bg-[#003366] transition"
            onClick={() => window.history.back()}
          >
            Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
