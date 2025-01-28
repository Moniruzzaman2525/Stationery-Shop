import { Skeleton, Avatar, List, Card, Empty } from "antd";
import { Link } from "react-router-dom";
import { useGetUserOrderQuery } from "../../redux/feathers/order/orderApi";
import OrderCart from "../../components/ui/OrderCart";
import { TOrder } from "../../types";




const Order = () => {
  const { data: orderData, isLoading } = useGetUserOrderQuery(undefined);

  const isEmpty = !orderData || orderData.length === 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        {isEmpty ? "You have no orders yet" : "View Your Order"}
      </h1>

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
      ) : isEmpty ? (
        <div className="flex flex-col justify-center items-center h-100">
          <Empty description="You have no orders yet" />
          <Link to="/all-products" className="mt-4">
            <button className="bg-[#001845] cursor-pointer !text-white px-6 py-2 rounded-lg hover:bg-[#003366] transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {orderData.map((order: TOrder) => (
            <OrderCart order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
