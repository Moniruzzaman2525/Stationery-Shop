import { Card } from "antd";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <div className="bg-[#F9F9FB] px-6 md:px-40 min-h-screen py-24">
            <section className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
                <p className="text-gray-600 text-base max-w-3xl mx-auto">
                    Welcome to <span className="font-bold">NS Book Shop</span>, your go-to destination for high-quality stationery and office supplies.
                    We take pride in providing products that inspire creativity and enhance productivity.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card
                    title="Our Mission"
                    bordered={false}
                    className="shadow-md transition-transform hover:scale-105"
                >
                    <p>
                        To offer top-notch stationery and craft supplies that fuel creativity, improve organization, and enrich daily life.
                    </p>
                </Card>
                <Card
                    title="Our Vision"
                    bordered={false}
                    className="shadow-md transition-transform hover:scale-105"
                >
                    <p>
                        To become a trusted name in stationery, celebrated for quality, affordability, and exceptional service.
                    </p>
                </Card>
            </section>

            <section className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Core Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { title: "Quality", description: "Delivering excellence in every product." },
                        { title: "Customer First", description: "Ensuring satisfaction at every step." },
                        { title: "Sustainability", description: "Promoting eco-friendly practices." },
                        { title: "Innovation", description: "Constantly improving to serve you better." },
                    ].map((value, index) => (
                        <Card
                            key={index}
                            bordered={false}
                            className="shadow-md transition-transform hover:scale-105"
                        >
                            <h3 className="font-bold text-lg text-gray-800">{value.title}</h3>
                            <p className="text-gray-600 mt-2">{value.description}</p>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Get In Touch</h2>
                <p className="text-gray-600 mb-6">
                    We’d love to hear from you! Reach out for any inquiries, feedback, or suggestions.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link to='/contact-us'>
                        <button className="bg-[#001845] cursor-pointer !text-white px-6 py-2 rounded-lg hover:bg-[#003366] transition">
                            Contact Us
                        </button>
                    </Link>
                    <Link to='/all-products'>
                        <button className="bg-gray-200 cursor-pointer text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
                            Explore Products
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
