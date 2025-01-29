import { Card } from "antd";

const testimonials = [
    {
        id: 1,
        name: "Ethan Carter",
        role: "Teacher",
        testimonial:
            "The quality of classroom supplies from this shop is outstanding! My students love the colorful notebooks and sturdy pens.",
        image: "https://media.istockphoto.com/id/1342216312/photo/arab-male-teacher-giving-remote-class-standing-near-blackboard-explaining-english-rules-to.jpg?s=2048x2048&w=is&k=20&c=YnmfvEFHYSRyOlY7W_NRHkKMcc4Y245SIeqDdEg2TBo=",
    },
    {
        id: 2,
        name: "Daniel Green",
        role: "Student",
        testimonial:
            "This store has everything I need for my studies. The variety of books and writing tools is amazing!",
        image: "https://media.istockphoto.com/id/2135466578/photo/male-college-students-are-working-on-laptops-and-searching-for-books-to-study-make-reports.jpg?s=2048x2048&w=is&k=20&c=y3k0VvTIP0gvtDV_xnYqiC0oD8BpAv1GK0EVpjj-VrA=",
    },
    {
        id: 3,
        name: "Samuel Lewis",
        role: "Artist",
        testimonial:
            "I am absolutely in love with the art supplies here! The sketchbooks and watercolor sets are of excellent quality.",
        image: "https://images.unsplash.com/photo-1628359355624-855775b5c9c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        name: "Oliver White",
        role: "Office Manager",
        testimonial:
            "Stocking up for my office has never been easier! Great prices and high-quality stationery products.",
        image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 5,
        name: "Isaac Brown",
        role: "Craft Enthusiast",
        testimonial:
            "This shop is a paradise for craft lovers! The collection of stickers, papers, and paints is simply fantastic.",
        image: "https://plus.unsplash.com/premium_photo-1677697324910-5538df8bc80b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 6,
        name: "Jessica Walker",
        role: "Parent",
        testimonial:
            "I always buy school supplies for my kids from here. The prices are reasonable, and the products are long-lasting.",
        image: "https://images.unsplash.com/photo-1629360057380-18b15b42e650?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 7,
        name: "Charlotte Harris",
        role: "Librarian",
        testimonial:
            "A great selection of books at affordable prices! I always find something new to add to our library.",
        image: "https://images.unsplash.com/photo-1576669803361-2f85b619711b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 8,
        name: "Lily Adams",
        role: "Calligraphy Enthusiast",
        testimonial:
            "The fountain pens and calligraphy sets here are top-notch. I highly recommend this store to all writing enthusiasts!",
        image: "https://images.unsplash.com/photo-1573844874632-733b0d7dc163?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                        className="shadow-lg p-6 rounded-lg bg-white text-center transition transition-transform hover:scale-105"
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