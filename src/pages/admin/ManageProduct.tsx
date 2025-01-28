/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Table, Skeleton, TableColumnsType, TableProps, Popconfirm } from "antd";
import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/feathers/product/productApi";
import { TProduct, TQueryParam } from "../../types";
import { useNavigate } from "react-router-dom";

export type TTableData = Pick<
  TProduct,
  "_id" | "photo" | "name" | "brand" | "category" | "price" | "stock"
>;

export const ManageProduct = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: semesterData, isFetching } = useGetAllProductsQuery(params);
  const navigate = useNavigate()

  const tableData: readonly TTableData[] | undefined = semesterData?.data?.map(
    ({ _id, photo, name, brand, category, price, stock }) => ({
      _id,
      photo,
      name,
      brand,
      category,
      price,
      stock,
    })
  );

  const updateProduct = (id: string) => {
    navigate(`/dashboard/update-product/${id}`);

  }

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo: string) => (
        <img
          src={photo}
          alt="Product"
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`, // Format price with two decimal places
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: boolean) => (stock ? "In Stock" : "Out of Stock"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Button onClick={() => updateProduct(record._id)} type="primary">Update</Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => console.log("Deleted:", record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
    console.log("Table params changed:", { filters, extra });
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Manage Products</h1>
      {isFetching ? (
        <Skeleton active />
      ) : (
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
          scroll={{ x: "max-content" }}
          rowKey={(record) => record._id}
          bordered
          pagination={{ pageSize: 5, showSizeChanger: true }}
          className="rounded-lg shadow-md"
        />
      )}
    </div>
  );
};
