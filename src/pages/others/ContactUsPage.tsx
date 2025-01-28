import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import SPForm from "../../components/form/SPForm";
import { FieldValues } from "react-hook-form";
import SPInput from "../../components/form/SPInput";
import SPTextarea from "../../components/form/SPTextArea";


const ContactUsPage = () => {
    const onSubmit = (data: FieldValues) => {
        console.log(data)
    };

    return (
        <div className="bg-gradient-to-b py-24 from-blue-50 to-white min-h-screen flex items-center justify-center px-6 md:px-40">
            <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="bg-[#001845] text-white p-6 md:p-10 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                        <p className="text-gray-300 mb-8">
                            We're here to assist you. Reach out for any inquiries or support.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MailOutlined className="text-2xl" />
                                <div>
                                    <h3 className="text-lg font-semibold">Email</h3>
                                    <p>web.moniruzzaman1@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <PhoneOutlined className="text-2xl" />
                                <div>
                                    <h3 className="text-lg font-semibold">Phone</h3>
                                    <p>+880 19257 16395</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <EnvironmentOutlined className="text-2xl" />
                                <div>
                                    <h3 className="text-lg font-semibold">Address</h3>
                                    <p>2100 Sherpur, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
                        <SPForm onSubmit={onSubmit}>
                            <div className="">
                                <SPInput type="text" name='name' label="Your Name" />
                            </div>
                            <div className="mt-[-20px]">
                                <SPInput type="text" name='email' label="Your Email" />
                            </div>
                            <div className="mt-[-20px]">
                                <SPTextarea name="message" label="Message" />
                            </div>
                            <button
                                type="submit"
                                className="bg-[#001845] cursor-pointer !text-white px-6 py-2 rounded-lg w-full hover:bg-[#003366] transition"
                            >
                                Send Message
                            </button>
                        </SPForm>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
