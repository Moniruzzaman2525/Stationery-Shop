import { FieldValues } from "react-hook-form";
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

interface ProductFormProps {
    initialData?: FieldValues; 
    isUpdate?: boolean; 
    onSuccess?: () => void; 
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, isUpdate = false, onSuccess }) => {
    const [uploading, setUploading] = useState(false);
    const [addProduct] = useCreateProductMutation();
    // const [updateProduct] = useUpdateProductMutation();

    const onSubmit = async (data: FieldValues) => {
        try {
            setUploading(true);
            if (data.photo && data.photo instanceof File) {
                const imageUrl = await uploadImageToImgBB(data.photo);
                if (imageUrl) data.photo = imageUrl;
            }
            if (isUpdate && initialData?._id) {
                // await updateProduct({ id: initialData._id, ...data }).unwrap();
            } else {
                await addProduct(data).unwrap();
            }

            // Success Callback
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 mt-10">
            <h1 className="text-xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                {isUpdate ? "Update Product" : "Add a Product"}
            </h1>
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
                <SPForm
                    resolver={zodResolver(productSchema)}
                    onSubmit={onSubmit}
                    defaultValues={initialData} 
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <SPInput type="text" name="name" label="Product Name" />
                            <SPInput type="text" name="price" label="Price" />
                            <SPSelect name="category" label="Category" options={categoryOption} />
                            
                        </div>
                        <div>
                            <SPInput type="text" name="brand" label="Brand Name" />
                            <SPInput type="text" name="quantity" label="Quantity" />
                            <SPInput type="text" name="inStock" label="In Stock" />
                            <SPTextarea name="description" label="Description" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full cursor-pointer py-3 bg-[#001845] !text-white rounded-lg transition"
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : isUpdate ? "Update Product" : "Add Product"}
                        </button>
                    </div>
                </SPForm>
            </div>
        </div>
    );
};

export default ProductForm;
