import { Button, Col, Flex, Form, Input, Row } from "antd";
import SPForm from "../../components/form/SPForm";
import SPInput from "../../components/form/SPInput";
import { Controller, FieldValues } from "react-hook-form";
import { SPSelect } from "../../components/form/SPSelect";

import { useState } from "react";
import { uploadImageToImgBB } from "../../utils/uploadImageToImgBB";
import { useCreateProductMutation } from "../../redux/feathers/product/productApi";
const categoryOption = [
    { value: 'Books', label: 'books' },
    { value: 'Art and Craft', label: 'Art and Craft' },
    { value: 'Stationery', label: 'Stationery' },
    { value: 'Classroom Supplies', label: 'Classroom Supplies' },
]
const CreateProduct = () => {

    const [uploading, setUploading] = useState(false);
    const [addProduct] = useCreateProductMutation()



    const onSubmit = async (data: FieldValues) => {
        try {
            setUploading(true);
            if (data.photo) {
                const imageUrl = await uploadImageToImgBB(data.photo);
                console.log(imageUrl)
                if (imageUrl) {
                    data.photo = imageUrl;
                    const res = await addProduct(data)
                    console.log(res)
                }
            }

        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setUploading(false);
        }
    };


    return (
        <Flex justify="center" align="center">
            <Col span={12}>
                <SPForm onSubmit={onSubmit} >
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <SPInput type="text" name="name" label="Product Name" />
                            <SPInput type="text" name="price" label="Price" />
                            <SPSelect name="category" label="Category" options={categoryOption} />
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <Controller
                                    name="photo"
                                    render={({ field: { onChange, value, ...field } }) => (
                                        <Form.Item label="Product Photo">
                                            <Input
                                                type="file"
                                                value={value?.fileName}
                                                {...field}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        onChange(file);
                                                    }
                                                }}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                        </Col>
                        <Col span={12}>
                            <SPInput type="text" name="brand" label="Brand Name" />
                            <SPInput type="text" name="description" label="Description" />
                            <SPInput type="text" name="quantity" label="Quantity" />
                        </Col>
                        <Col span={24}>
                            <Button style={{
                                width: "100%",
                                padding: "20px",
                                backgroundColor: "#001845",
                                color: "#fff",
                                borderRadius: "5px",
                                border: "none",
                            }} htmlType="submit" loading={uploading} block>
                                {uploading ? "Uploading..." : "Submit"}
                            </Button>
                        </Col>
                    </Row>

                </SPForm>
            </Col>
        </Flex>
    );
};

export default CreateProduct;