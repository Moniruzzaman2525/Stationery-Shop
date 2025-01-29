import { Card } from "antd";

const testimonials = [
    {
      id: 1,
      name: "Emily Carter",
      role: "Teacher",
      testimonial:
        "The quality of classroom supplies from this shop is outstanding! My students love the colorful notebooks and sturdy pens.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Daniel Green",
      role: "Student",
      testimonial:
        "This store has everything I need for my studies. The variety of books and writing tools is amazing!",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Sophia Lewis",
      role: "Artist",
      testimonial:
        "I am absolutely in love with the art supplies here! The sketchbooks and watercolor sets are of excellent quality.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Oliver White",
      role: "Office Manager",
      testimonial:
        "Stocking up for my office has never been easier! Great prices and high-quality stationery products.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Isabella Brown",
      role: "Craft Enthusiast",
      testimonial:
        "This shop is a paradise for craft lovers! The collection of stickers, papers, and paints is simply fantastic.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "James Walker",
      role: "Parent",
      testimonial:
        "I always buy school supplies for my kids from here. The prices are reasonable, and the products are long-lasting.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      name: "Charlotte Harris",
      role: "Librarian",
      testimonial:
        "A great selection of books at affordable prices! I always find something new to add to our library.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      name: "Liam Adams",
      role: "Calligraphy Enthusiast",
      testimonial:
        "The fountain pens and calligraphy sets here are top-notch. I highly recommend this store to all writing enthusiasts!",
      image: "https://via.placeholder.com/150",
    },
  ];
  

const TestimonialsPage = () => {
  return (
    <div className="px-6 md:px-40 py-18">
      <div className="max-w-full mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800">What People Say</h1>
        <p className="text-gray-600 mt-2">
          Hear from our happy readers and customers.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-full mx-auto">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="shadow-lg p-6 rounded-lg bg-white text-center transition transform hover:-translate-y-2 hover:shadow-xl"
            bordered={false}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="h-20 w-20 rounded-full mx-auto mb-4 border-4 border-gray-200"
            />
            <h3 className="text-lg font-bold text-gray-800">{testimonial.name}</h3>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
            <p className="mt-4 text-gray-600 italic">"{testimonial.testimonial}"</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsPage;