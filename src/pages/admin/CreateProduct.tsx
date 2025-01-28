import { Controller, FieldValues } from "react-hook-form";
import { useState } from "react";
import { uploadImageToImgBB } from "../../utils/uploadImageToImgBB";
import { useCreateProductMutation } from "../../redux/feathers/product/productApi";
import SPForm from "../../components/form/SPForm";
import SPInput from "../../components/form/SPInput";
import { SPSelect } from "../../components/form/SPSelect";
import SPTextarea from "../../components/form/SPTextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../schema/product.schema";

const categoryOption = [
    { value: "Books", label: "Books" },
    { value: "Art and Craft", label: "Art and Craft" },
    { value: "Stationery", label: "Stationery" },
    { value: "Classroom Supplies", label: "Classroom Supplies" },
];

const CreateProduct = () => {
    const [uploading, setUploading] = useState(false);
    const [addProduct] = useCreateProductMutation();

    const onSubmit = async (data: FieldValues) => {
        try {
            setUploading(true);
            if (data.photo) {
                const imageUrl = await uploadImageToImgBB(data.photo);
                if (imageUrl) {
                    data.photo = imageUrl;
                    const res = await addProduct(data);
                    console.log(res);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#F9F9FB] mt-10">
            <h1 className="text-xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                Add a stationery Product
            </h1>
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
                <SPForm resolver={zodResolver(productSchema)} onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="">
                                <SPInput type="text" name="name" label="Product Name" />
                            </div>
                            <div className="mt-[-15px]">
                                <SPInput type="text" name="price" label="Price" />
                            </div>
                            <div className="mt-[-15px]">
                                <SPSelect name="category" label="Category" options={categoryOption} />
                            </div>
                            <div className="mt-[-15px]">
                                <Controller
                                    name="photo"
                                    render={({ field: { onChange, ref }, fieldState: { error } }) => (
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-medium mb-2">
                                                Product Photo
                                            </label>
                                            <input
                                                type="file"
                                                className={`w-full border rounded-lg p-2 ${error ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                ref={ref}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        onChange(file);
                                                    }
                                                }}
                                            />
                                            {error && (
                                                <small className="text-red-500">
                                                    {error.message || "This field is required"}
                                                </small>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>

                        </div>
                        <div>
                            <div className="">
                                <SPInput type="text" name="brand" label="Brand Name" />
                            </div>
                            <div className="mt-[-15px]">
                                <SPInput type="text" name="quantity" label="Quantity" />
                            </div>
                            <div className="mt-[-15px]">
                                <SPInput type="text" name="inStock" label="In Stock" />
                            </div>
                            <div className="mt-[-15px]">
                                <SPTextarea name="description" label="Description" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full cursor-pointer py-3 bg-[#001845] !text-white rounded-lg  transition"
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "Submit"}
                        </button>
                    </div>
                </SPForm>
            </div>
        </div>
    );
};

export default CreateProduct;
