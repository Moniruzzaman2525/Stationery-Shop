import { Card } from "antd";

const blogs = [
    {
      "id": 1,
      "title": "Top 10 Must-Have Stationery Items for Professionals",
      "description": "Discover essential stationery items that boost productivity and organization for professionals.",
      "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
      "date": "January 28, 2025"
    },
    {
      "id": 2,
      "title": "Creative Crafting Ideas for Kids and Adults",
      "description": "Explore fun and creative crafting ideas using arts and crafts supplies for both kids and adults.",
      "image": "https://i.ibb.co.com/sqj3Bjp/premium-photo-1686920245013-365ae71428a2.jpg",
      "date": "January 20, 2025"
    },
    {
      "id": 3,
      "title": "The Art of Journaling",
      "description": "Learn how journaling can improve your mental health and productivity using premium stationery.",
      "image": "https://i.ibb.co.com/wRQZBqX/photo-1510935813936-763eb6fbc613.jpg",
      "date": "January 5, 2025"
    },
    {
      "id": 4,
      "title": "How to Create a Productive Study Space for Students",
      "description": "Set up the perfect study space with essential classroom supplies for enhanced focus and efficiency.",
      "image": "https://i.ibb.co.com/mNYQDVr/premium-photo-1661573775711-687642300327.jpg",
      "date": "January 15, 2025"
    },
    {
      "id": 5,
      "title": "Eco-Friendly Stationery: Sustainable Choices for a Greener Planet",
      "description": "Discover eco-friendly stationery products to reduce your carbon footprint while staying productive.",
      "image": "https://i.ibb.co.com/1rX2jvY/photo-1614730321146-b6fa6a46bcb4.jpg",
      "date": "January 10, 2025"
    },
    {
      "id": 6,
      "title": "DIY Classroom Decoration Ideas",
      "description": "Get inspired with creative DIY decoration ideas to transform your classroom into a vibrant learning space.",
      "image": "https://i.ibb.co.com/qL6Rbrr/photo-1577896851231-70ef18881754.jpg",
      "date": "December 30, 2024"
    }
  ]
  
  

const BlogPage: React.FC = () => {
  const handleReadMore = (id: number) => {
    console.log(`Read more about blog ID: ${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen px-6 md:px-30 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Our Blog</h1>
          <p className="text-gray-600 mt-2">
            Stay updated with the latest trends, tips, and ideas from the world
            of stationery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
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
              <p className="text-sm text-gray-500 mb-4">{blog.date}</p>
              <p className="text-gray-600 line-clamp-3 mb-4">
                {blog.description}
              </p>
              <button
                 className="bg-[#001845] cursor-pointer !text-white px-6 py-2 rounded-lg hover:bg-[#003366] transition"
                onClick={() => handleReadMore(blog.id)}
              >
                Read More
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
