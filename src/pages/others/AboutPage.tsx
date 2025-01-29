import { Card } from "antd";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <div className="bg-[#F9F9FB] px-6 md:px-32 lg:px-48 xl:px-60 min-h-screen py-20">
            <section className="text-center mb-16">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-6">About Us</h1>
                <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                    Welcome to <span className="font-bold #001845">NS Book Shop</span>, your one-stop destination for high-quality stationery and office essentials. 
                    We are committed to bringing you the best products that inspire creativity and enhance productivity.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <Card
                    title={<h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>}
                    bordered={false}
                    className="shadow-md transition-transform hover:scale-105 bg-white p-6 rounded-lg"
                >
                    <p className="text-gray-600 leading-relaxed">
                        To provide premium-quality stationery and office supplies that help individuals and businesses stay organized, creative, and efficient.
                    </p>
                </Card>
                <Card
                    title={<h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>}
                    bordered={false}
                    className="shadow-md transition-transform hover:scale-105 bg-white p-6 rounded-lg"
                >
                    <p className="text-gray-600 leading-relaxed">
                        To become the leading name in stationery, recognized for innovation, quality, and exceptional customer service.
                    </p>
                </Card>
            </section>

            <section className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Core Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[ 
                        { title: "Quality", description: "Delivering top-tier products with excellence." },
                        { title: "Customer Satisfaction", description: "Ensuring every customer has a seamless experience." },
                        { title: "Sustainability", description: "Promoting eco-friendly and responsible practices." },
                        { title: "Innovation", description: "Continuously evolving to provide the best solutions." },
                    ].map((value, index) => (
                        <Card
                            key={index}
                            bordered={false}
                            className="shadow-md transition-transform hover:scale-105 bg-white p-6 rounded-lg"
                        >
                            <h3 className="font-bold text-xl text-gray-800">{value.title}</h3>
                            <p className="text-gray-600 mt-2 leading-relaxed">{value.description}</p>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Connect With Us</h2>
                <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                    Have questions or suggestions? Reach out to us for assistance, collaborations, or inquiries. We’d love to hear from you!
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <Link to='/contact-us'>
                        <button className="bg-[#001845] cursor-pointer !text-white px-6 py-3 rounded-lg hover:bg-[#003366] transition">
                            Contact Us
                        </button>
                    </Link>
                    <Link to='/all-products'>
                        <button className="bg-[#001845] cursor-pointer !text-white px-6 py-3 rounded-lg hover:bg-[#003366] transition">
                            Browse Products
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;