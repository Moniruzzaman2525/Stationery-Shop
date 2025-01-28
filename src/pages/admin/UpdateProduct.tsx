import ProductForm from "../../components/ui/ProductForm";
import { useGetSingleProductQuery } from "../../redux/feathers/product/productApi";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
    const { productId } = useParams();
    const { data: productData, isLoading } = useGetSingleProductQuery(productId);

    const handleSuccess = () => {
        console.log("Product updated successfully!");
    };

    if (isLoading) return <p>Loading...</p>;

    return <ProductForm initialData={productData} isUpdate={true} onSuccess={handleSuccess} />;
};

export default UpdateProduct;
