import { Avatar, Card, List, Typography } from "antd";
import { TOrder } from "../../types";

interface ProductCardProps {
    order: TOrder;
}
const OrderCart:  React.FC<ProductCardProps> = ({order}) => {
    const { Text } = Typography;
    return (
        <div>
            <Card key={order._id} className="!mb-4 shadow-md">
                <List.Item.Meta
                    avatar={<Avatar src={order.product.photo} />}
                    title={
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">
                                {order.product.name}
                            </span>
                            <Text type="secondary">Quantity: {order?.product?.quantity}</Text>
                        </div>
                    }
                    description={
                        <div className="mt-2">
                            <p>
                                <Text strong>Customer Name:</Text> {order.user.name}
                            </p>
                            <p>
                                <Text strong>Price:</Text> ${order.product.price}
                            </p>
                            <p>
                                <Text strong>Order Date:</Text> {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                            <p>
                                <Text strong>Status:</Text> {order.status}
                            </p>
                        </div>
                    }
                />
            </Card>
        </div>
    );
};

export default OrderCart;