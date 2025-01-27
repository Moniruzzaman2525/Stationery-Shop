import React from "react";
import { Skeleton, Avatar, List, Card, Typography } from "antd";
import { useGetUserOrderQuery } from "../../redux/feathers/order/orderApi";
import { TProduct } from "../../types";

const { Text } = Typography;

interface Order {
  _id: string;
  product: TProduct;
  totalAmount: number;
  currency: string;
  paymentId: string;
  paymentStatus: string;
  user: {
    _id: string;
    id: string;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
  orderDate: string;
  createdAt: string;
  updatedAt: string;
}

const Order = () => {
  const { data: orderData, isLoading } = useGetUserOrderQuery(undefined);
  console.log(orderData)
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">View Your Order</h1>

      {isLoading ? (
        <div className="max-w-4xl mx-auto">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="mb-4">
              <Skeleton avatar active>
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={<Skeleton.Input style={{ width: 200 }} active />}
                  description={<Skeleton.Input style={{ width: 300 }} active />}
                />
              </Skeleton>
            </Card>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {orderData?.map((order: Order) => (
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
                      <Text strong>Payment Status:</Text> {order.paymentStatus}
                    </p>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
